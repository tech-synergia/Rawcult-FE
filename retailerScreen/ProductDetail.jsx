import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import Table from '../components/Table';
import SizeCard from '../components/SizeCard';
import {ImageSlider} from 'react-native-image-slider-banner';
import {useEffect} from 'react';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Share from 'react-native-share';

const ProductDetail = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [colorChart, setColorChart] = useState('white');
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0); // Default quantity
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [textColor, setTextColor] = useState('#000');
  const [data, setData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [fixedQuantity, setFixedQuantity] = useState(10);
  const [totalQuantity, setTotalQuantity] = useState(10);
  const [availablelQuantity, setAvailablelQuantityy] = useState(totalQuantity);
  const [minQty, setMinQty] = useState(0);
  const [state, setState] = useState({
    tableHead: ['Head1', 'Head2', 'Head3', 'Head4'],
    tableData: [
      ['1', '2', '3', '4'],
      ['a', 'b', 'c', 'd'],
      ['1', '2', '3', '456\n789'],
      ['a', 'b', 'c', 'd'],
    ],
  });
  const [userId, setUserId] = useState('');
  const [loginToken, setLOginToken] = useState('');
  let user;
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
      user = await AsyncStorage.getItem('user');
      const loggedUser = JSON.parse(user);
      setUserId(loggedUser.userId);
      // console.log("njnjbjbjbjbj", getToken);
    })();
  }, []);

  const totalSelectedQuantity = fixedQuantity - availablelQuantity;
  const route = useRoute();

  const {id: productId} = route.params;
  console.log(
    '🚀 ~ file: ProductDetail.jsx:45 ~ ProductDetail ~ productId:',
    productId,
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://rawcult-be.vercel.app/products/id/${productId}`,
      ); // Replace with your API endpoint
      if (response.status === 200) {
        const sizeArray = [];
        let qty = 0;
        console.log('resssss', response?.data?.product?.minQty);
        setMinQty(response?.data?.product?.minQty);
        response.data.product.sizes.map(val => {
          qty += val.quantity;
          sizeArray.push({size: val.size, quantity: val.quantity});
        });
        console.log('qty', qty);
        setTotalQuantity(qty);
        setFixedQuantity(qty);
        setSizes(sizeArray);
        setData(response?.data?.product);
      } else {
        Alert.alert('Error');
      }
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const images = [
    require('../assets/first.jpg'),
    require('../assets/second.jpg'),
    require('../assets/third.jpg'),
    require('../assets/forth.jpg'),
    require('../assets/fifth.jpg'),
  ];
  const [image, setImages] = useState(images);

  // Calculate the percentage of available quantity

  const percentage = (availablelQuantity / fixedQuantity) * 100;

  // Determine the color based on the percentage
  const color = percentage < 10 ? 'red' : 'green';

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 20) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert(
        'Quantity Limit',
        'Minimum quantity is 20',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  useEffect(() => {
    console.log('QQQQ', quantity);
    const selectedQuantity = tableData.reduce(
      (acc, curr) => (acc += curr.quantity),
      0,
    );
    setAvailablelQuantityy(
      selectedQuantity <= 0 ? fixedQuantity : fixedQuantity - selectedQuantity,
    );
    console.log('>>>>>>>', selectedQuantity, fixedQuantity);
  }, [tableData]);

  const handleSizeSelection = ({size, quantity}) => {
    setSelectedSize(size);
    setTotalQuantity(totalQuantity - 1);
    const newData = {size, color: colorChart, quantity: 1, price: data.price};
    const index = tableData.findIndex(
      item => item.size === size && item.color === colorChart,
    );
    if (index !== -1) {
      setTableData(prev => {
        const updatedData = [...prev];
        updatedData[index] = {...updatedData[index], ...newData};
        return updatedData;
      });
    } else {
      setTableData(prev => [...prev, newData]);
    }
    setQuantity(quantity);
    setBackgroundColor('#000');
    setTextColor('#000');
  };

  const handleQuantityChange = text => {
    // Validate and set the quantity
    const parsedQuantity = parseInt(text, 10);
    if (!isNaN(parsedQuantity)) {
      setQuantity(parsedQuantity);
    }
  };

  const Colordata = [
    {label: 'Black', value: 'black'},
    {label: 'White', value: 'white'},
    {label: 'Red', value: 'red'},
    {label: 'Green', value: 'green'},
    {label: 'Blue', value: 'blue'},
    {label: 'Orange', value: 'orange'},
    {label: 'Multicolour', value: 'multicolour'},
    {label: 'Pink', value: 'pink'},
  ];

  console.log('daaa', quantity);

  const handleBuyNow = async () => {
    const orderData = {
      productId,
      userId,
      productName: data?.name,
      description: data?.description,
      sizes: tableData,
      totalQuantity: totalSelectedQuantity,
      price: data?.price,
      image: data?.image,
    };
    if (loginToken && userId) {
      if (totalSelectedQuantity >= minQty) {
        try {
          const response = await axios.post(
            'https://rawcult-be.vercel.app/cart/addCartItem',
            orderData,
            {
              headers: {
                Authorization: `Bearer ${loginToken}`,
                'Content-Type': 'application/json', // Set the content type as per your API's requirements
              },
            },
          );
          console.log('??????????', response);
          if (response.status === 201) {
            // Show email verification alert
            Alert.alert(
              'Product added to cart',
              'You can see it in your Cart',
              [
                // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('cart', {addToCart: true}),
                },
              ],
            );
          } else {
            // Show error message
            Alert.alert('Error', 'Something went wrong!');
          }
        } catch (error) {
          // Alert.alert('Error', 'Something went wrong!');
        }
      } else {
        Alert.alert(
          'Quantity Limit',
          `There should be minimum ${minQty} to proceed.`,
          [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('ProductDetail', {id: productId}),
            },
          ],
        );
      }
    } else {
      Alert.alert(
        'You are not logged in!',
        'Please Login to Add items to cart.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Signin'),
          },
        ],
      );
    }
  };

  const shareProduct = () => {
    const options = {
      url: data?.image[0],
      message: `${data?.name} ${data?.description} Price: ${data?.price}.00 rupees`,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const newCurrentIndex = Math.round(
      contentOffset.x / Dimensions.get('window').width,
    );
    setCurrentIndex(newCurrentIndex);
  };
  return (
    <View style={{marginTop: 15, marginBottom: 40}}>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <ScrollView>
        <TouchableOpacity onPress={shareProduct}>
          <View style={{width: '95%'}}>
            <Ionicons
              style={{alignSelf: 'flex-end'}}
              name="share-social-sharp"
              size={30}
              color={'#000'}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            ref={scrollViewRef}>
            {data?.image?.map((item, index) => (
              <View
                style={{
                  // flexDirection: 'row',
                  // marginRight: 40,
                  width: Dimensions.get('window').width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={index}>
                <Image
                  style={{
                    // width: Dimensions.get('window').width,
                    width: 380,
                    height: 250,
                    marginTop: 16,
                    marginLeft: 10,
                    marginRight: 10,
                    objectFit: 'cover',
                  }}
                  source={{uri: item}}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.paginationContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
        <View>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: '900',
              color: 'grey',
              fontSize: 22,
              marginTop: 15,
            }}>
            {data?.name}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: '700',
              fontSize: 15,
              color: 'grey',
            }}>
            {data?.description}
          </Text>
          <ProgressBar
            progress={selectedSize ? percentage / 100 : percentage} // Convert percentage to a value between 0 and 1
            color={color}
            style={{
              height: 15,
              borderRadius: 5,
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 25,
                fontSize: 15,
                fontWeight: '800',
                marginTop: 5,
                color: 'green',
              }}>
              Total availablle:
            </Text>
            <Text
              style={{
                marginLeft: 3,
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 5,
                color: '#000',
              }}>
              {selectedSize ? availablelQuantity : fixedQuantity}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: '700',
              color: '#000',
              marginTop: 5,
              marginLeft: 12,
              fontSize: 20,
            }}>
            <FontAwesome name="rupee" size={18} /> {data?.price}
          </Text>

          <Text
            style={{
              marginLeft: 12,
              marginTop: 15,
              fontSize: 18,
              fontWeight: '700',
              color: '#000',
            }}>
            Size:
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {sizes.map(val => (
                <>
                  <TouchableOpacity onPress={() => handleSizeSelection(val)}>
                    <SizeCard
                      size={val.size}
                      textColor={textColor}
                      backgroundColor={backgroundColor}
                    />
                  </TouchableOpacity>
                </>
              ))}
            </View>

            <View style={{marginTop: -30, marginRight: 20}}>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Color:
              </Text>
              <Dropdown
                style={[
                  styles.sizedropdown,
                  isFocus && {borderColor: '#4075c9'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: '#000'}}
                data={Colordata}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : 'Select One'}
                value={colorChart}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setColorChart(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
          {selectedSize && (
            <Table
              tableData={tableData}
              setTotalQuantity={setTotalQuantity}
              setTableData={setTableData}
              colorChart={colorChart}
              totalQuantity={totalQuantity}
              sizes={sizes}
            />
          )}
        </View>

        {selectedSize ? (
          <>
            <View
              style={{
                height: 1,
                width: '90%',
                backgroundColor: '#d2cdd4',
                alignSelf: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  marginRight: 5,
                  fontSize: 20,
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                Sub Total:
              </Text>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 25,
                  fontSize: 20,
                  color: '#5170ff',
                  fontWeight: '800',
                }}>
                <FontAwesome name="rupee" size={18} />
                {''}
                {totalSelectedQuantity * data?.price}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '90%',
                backgroundColor: '#d2cdd4',
                alignSelf: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}
            />
          </>
        ) : (
          ''
        )}
        <View
          style={{
            height: 70,
            width: '100%',
            borderRadius: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 15,
            alignSelf: 'center',
            padding: 10,
            marginBottom: 15,
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
            <View
              style={{
                backgroundColor: '#f2cbcf',
                height: 65,
                width: 160,
                borderRadius: 10,
              }}>
              <Ionicons
                style={{alignSelf: 'center'}}
                name="heart"
                color={'red'}
                size={28}
              />

              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Add to Wishlist
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBuyNow}>
            <View
              style={{
                backgroundColor: '#cbdaf2',
                height: 65,
                width: 160,
                borderRadius: 10,
                marginRight: 20,
              }}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name="cart-plus"
                color={'#2a6fde'}
                size={28}
              />

              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 410,
    height: '90%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  dropdown: {
    height: 50,
    width: '50%',
    alignSelf: 'center',
    borderColor: '#74a1e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  sizedropdown: {
    width: 120,
    height: 50,
    borderWidth: 1,
    borderColor: '#74a1e8',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 25,
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#acafb5',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'grey',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 120,
    marginLeft: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
