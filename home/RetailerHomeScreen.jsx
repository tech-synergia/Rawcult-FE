import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Header} from '../components/Header';
import ItemCard from '../components/ItemCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GenderCard from '../components/GenderCard';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SellersCard from '../components/SellersCard';
import ShopCard from '../components/ShopCard';
const RetailerHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [SearchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch data using axios
    axios
      .get(`https://rawcult-be.vercel.app/products/search?q=${query}`)
      .then(response => {
        setSearchData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [query]);

  useEffect(() => {
    // Filter data based on the query
    const filtered = data.filter(item => item.name.includes(query)); // Change 'name' to the key you want to filter on
    setFilteredData(filtered);
  }, [data, query]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://rawcult-be.vercel.app/products',
      ); // Replace with your API endpoint
      if (response.status === 200) {
        setData(response?.data?.products);
      } else {
        Alert.alert('Error');
      }
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('search', query);
  console.log('daaa', data);
  useEffect(() => {
    fetchData();
  }, []);
  const women = require('../assets/Women.png');
  const men = require('../assets/Men.png');
  const kids = require('../assets/kid.png');

  const images = [
    require('../assets/Banner1.png'),
    require('../assets/Banner2.png'),
    require('../assets/Banner.png'),
  ];

  const shopData = [
    {name: 'Shirts', image: require('../assets/Shirts.jpeg')},
    {name: 'T-Shirts', image: require('../assets/T-shirt.jpeg')},
    {name: 'Jeans', image: require('../assets/Jeans.webp')},
    {name: 'Tops', image: require('../assets/Tops.jpg')},
    {name: 'Dresses', image: require('../assets/Dress.jpeg')},
    {name: 'Kurta Sets', image: require('../assets/kurta.webp')},
    {name: 'Suits', image: require('../assets/suits.webp')},
    {name: 'Accessories', image: require('../assets/acessories.jpeg')},
  ];
  const kidsShopData = [
    {name: 'Shirts', image: require('../assets/kid1.webp')},
    {name: 'T-Shirts', image: require('../assets/kid2.jpeg')},
    {name: 'Jeans', image: require('../assets/kid3.jpeg')},
    {name: 'Tops', image: require('../assets/kid4.webp')},
    {name: 'Dresses', image: require('../assets/kid5.webp')},
    {name: 'Accessories', image: require('../assets/kid6.jpeg')},
  ];

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30, marginLeft: 10}}>
          <Header />

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Searchbar
              style={{width: '90%'}}
              placeholder="Search Products"
              value={query}
              onChangeText={text => setQuery(text)}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                style={{marginLeft: 3, marginTop: 10}}
                name="options-outline"
                size={30}
                color="#615f5f"
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <GenderCard
              image={women}
              gender={'Women'}
              backgroundColor={'#b595bf'}
            />
            <GenderCard
              image={men}
              gender={'Men'}
              backgroundColor={'#9dace0'}
            />
            <GenderCard
              backgroundColor={'#c3dfe3'}
              image={kids}
              gender={'Kids'}
            />
          </View>

          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={images}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  height: 200,
                  width: 420,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                <Image
                  style={{
                    height: 200,
                    width: 400,
                    marginRight: 10,
                  }}
                  source={item}
                />
              </View>
            )}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View
              style={{
                position: 'absolute',
                height: '25%',
                bottom: 490,
                borderColor: '#95359c',
                borderRadius: 10,
                width: '50%',
                alignSelf: 'flex-end',
                backgroundColor: '#fff',
                marginRight: 5,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, alignSelf: 'flex-end'}}>
                  <Entypo name="cross" size={28} color={'grey'} />
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: -10,
                    color: '#000',
                  }}>
                  Sort By
                </Text>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#dee0e3',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                }}>
                Popularity
              </Text>

              <View
                style={{
                  height: 0.8,
                  width: '100%',
                  backgroundColor: '#dee0e3',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                }}>
                Price--Low to High
              </Text>
              <View
                style={{
                  height: 0.8,
                  width: '100%',
                  backgroundColor: '#dee0e3',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                }}>
                Price--High to Low
              </Text>
              <View
                style={{
                  height: 0.8,
                  width: '100%',
                  backgroundColor: '#dee0e3',
                  alignSelf: 'center',
                }}
              />
            </View>
          </Modal>
          {/* <View style={{flex: 1, marginTop: 10}}>
          <SliderBox
            images={images}
            sliderBoxHeight={300}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
          />
        </View> */}
          {/* {data?.length ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {data.map((item, index) => (
                  <ItemCard
                    key={index}
                    product_name={item?.name}
                    image={image1}
                    product_price={Number(item?.price).toFixed(2)}
                    productId={item?._id}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <ActivityIndicator
                style={{width: 200, height: 200}}
                animating={true}
                color={MD2Colors.grey600}
              />
            </>
          )} */}
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 30,
            textAlign: 'center',
            marginBottom: 30,
            backgroundColor: '#000',
            color: '#fff',
            padding: 10,
            borderRadius: 2,
          }}>
          Shop for Men and Women
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
          {shopData.map((item, index) => (
            <ShopCard
              key={index}
              image={item?.image}
              product_type={item?.name}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 15,
            marginTop: -10,
            backgroundColor: '#000',
            height: 40,
            width: 160,
            borderRadius: 20,
          }}>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontSize: 17,
              color: '#fff',
            }}>
            Explore more
          </Text>
          <AntDesign
            style={{marginLeft: 5, marginTop: 5}}
            name="right"
            size={25}
            color={'#fff'}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
            marginBottom: 30,
            backgroundColor: '#000',
            color: '#fff',
            padding: 10,
            borderRadius: 2,
          }}>
          Shop for Kids
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
          {kidsShopData.map((item, index) => (
            <ShopCard
              key={index}
              image={item?.image}
              product_type={item?.name}
            />
          ))}
        </View>

        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              marginTop: 20,
              textAlign: 'center',
            }}>
            Recommended Sellers
          </Text>
          <ScrollView horizontal>
            <SellersCard />
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={Alert.alert('WhatsApp')}
        style={{position: 'absolute', bottom: 80, right: 20}}>
        <Image
          style={{height: 60, width: 60}}
          source={require('../assets/whatsapp.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RetailerHomeScreen;

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
  child: {height: 300, width: '95%', justifyContent: 'center'},
  text: {fontSize: 20, textAlign: 'center'},
});
