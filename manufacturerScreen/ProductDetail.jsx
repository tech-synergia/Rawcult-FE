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
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import Table from '../components/Table';
import SizeCard from '../components/SizeCard';
import {ImageSlider} from 'react-native-image-slider-banner';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({navigation}) => {
  // const totalQuantity = 90;
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
        console.log('resssss', response?.data?.product);
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
    setQuantity(20);
    setBackgroundColor('#000');
    setTextColor('#fff');
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
      sizes: tableData,
    };
    console.log(orderData);
    if (totalSelectedQuantity >= quantity) {
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
          Alert.alert('Product added to cart', 'You can see it in your Cart', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {
              text: 'OK',
              onPress: () => navigation.navigate('cart'),
            },
          ]);
        } else {
          // Show error message
          Alert.alert('Error', 'Something went wrong!');
        }
      } catch (error) {
        // Alert.alert('Error', 'Something went wrong!');
      }
    } else {
      console.log('>>>>', quantity);

      Alert.alert(
        'Quantity Limit',
        `There should be minimum ${quantity} to proceed.`,
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
  };

  return (
    <View style={{marginTop: 15, marginBottom: 40}}>
      <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <ScrollView>
        <ScrollView horizontal>
          {data?.image?.map((item, index) => (
            <View style={{flexDirection: 'row', marginRight: 40}} key={index}>
              <Image
                style={{
                  height: 250,
                  width: 300,
                  marginTop: 16,
                  margin: 30,
                  marginRight: -10,
                }}
                source={{uri: item}}
              />
            </View>
          ))}
        </ScrollView>
        <View>
          <Text
            style={{
              marginLeft: 10,
              fontWeight: '900',
              color: 'grey',
              fontSize: 22,
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
    position: 'absolute',
    bottom: 16, // Adjust the vertical position as needed
    alignSelf: 'center', // Center the dots horizontally
  },
  paginationDot: {
    width: 8, // Adjust the dot size
    height: 8, // Adjust the dot size
    borderRadius: 4, // Make the dot round
    backgroundColor: '#14489c', // Dot color
    marginHorizontal: 4, // Adjust the space between dots
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
