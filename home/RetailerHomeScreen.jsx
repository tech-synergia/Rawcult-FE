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
  TouchableHighlight,
  FlatList,
  Linking,
  BackHandler,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
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

const RetailerHomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [SearchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [listData, setListData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const backAction = () => {
      console.log('hhhhoooooo', isFocused);

      if (isFocused) {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [isFocused]);

  useEffect(() => {
    axios
      .get(`https://rawcult-be.vercel.app/products/search?q=${query}`)
      .then(response => {
        const result = response.data.map(val => ({
          id: val._id,
          title: val.name,
        }));
        setSearchData([...result, {title: 'view all'}]);
        setIsDropdownOpen(query.length > 0);
      })
      .catch(error => {
        console.error(error);
      });
  }, [query]);

  // useEffect(() => {
  //   console.log('data', data);
  //   const filtered = data.filter(item => item.name.includes(query)); // Change 'name' to the key you want to filter on
  //   console.log(
  //     '🚀 ~ file: RetailerHomeScreen.jsx:52 ~ useEffect ~ filtered:',
  //     filtered,
  //   );
  //   setFilteredData(filtered);
  // }, [data, query]);

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
  const handleCommunityRedirect = () => {
    const url = 'https://whatsapp.com/channel/0029Va4SycG5K3zdkqOyFx30'; // Replace with your desired URL
    Linking.openURL(url).catch(err => console.error('Error:', err));
  };
  return (
    <View style={{marginBottom: 255, backgroundColor: 'transparent'}}>
      <Header />
      <View
        style={{
          width: '100%',
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#006DFF',
          height: '15%',
          justifyContent: 'center',
          borderBottomRightRadius: 90,
          marginBottom: 20,
        }}>
        <Searchbar
          style={{
            width: '75%',
            height: 55,
            marginTop: 10,
            borderRadius: 30,
          }}
          placeholder="Search Products"
          value={query}
          onChangeText={text => setQuery(text)}
          onIconPress={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </View>

      {isDropdownOpen && (
        <FlatList
          data={SearchData}
          renderItem={({item}) => (
            <>
              <ScrollView showsVerticalScrollIndicator={true}>
                <View
                  style={{
                    backgroundColor: '#e6e7eb',
                    width: '70%',
                    alignSelf: 'center',
                    padding: 10,
                    marginRight: 5,
                    height: 'auto',
                  }}>
                  <TouchableOpacity
                    onPress={event => {
                      if (item.title === 'view all') {
                        return navigation.navigate('allProducts');
                      }
                      navigation.navigate('ProductDetail', {id: item.id});
                      console.log(
                        'Clicked on title:',
                        item.title,
                        'with ID:',
                        item.id,
                      );
                    }}>
                    <Text
                      style={{
                        height: 20,
                        fontSize: 15,
                        color: '#3f5ce0',
                        fontWeight: '500',
                        marginLeft: 5,
                        marginTop: -6,
                        marginBottom: 5,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
          keyExtractor={item => item.id}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('categories', {key: 0})}>
            <GenderCard
              image={women}
              gender={'Women'}
              backgroundColor={'#b595bf'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('categories', {key: 1})}>
            <GenderCard
              image={men}
              gender={'Men'}
              backgroundColor={'#9dace0'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('categories', {key: 2})}>
            <GenderCard
              backgroundColor={'#c3dfe3'}
              image={kids}
              gender={'Kids'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 260,
            backgroundColor: '#cedced',
            flex: 1,
            marginTop: 20,
            marginBottom: 10,
            padding: 10,
          }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={images}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('allProducts')}>
                <Image
                  style={{
                    height: 200,
                    width: 390,
                    marginTop: 16,
                    borderRadius: 5,
                  }}
                  source={item}
                />
              </TouchableOpacity>
            )}
          />
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
            <TouchableOpacity
              onPress={() => navigation.navigate('categories', {key: 0})}>
              <ShopCard
                key={index}
                image={item?.image}
                product_type={item?.name}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('allProducts')}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginRight: 15,
              marginTop: -10,
              backgroundColor: '#e3e6e4',
              height: 40,
              width: 150,
              borderRadius: 20,
              justifyContent: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 17,
                color: '#000',
                fontWeight: '500',
              }}>
              Explore more
            </Text>
            <AntDesign
              style={{marginLeft: 5, marginTop: -1}}
              name="right"
              size={25}
              color={'#000'}
            />
          </View>
        </TouchableOpacity>
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
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('categories', {key: 3})}>
              <ShopCard
                key={index}
                image={item?.image}
                product_type={item?.name}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('allProducts')}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginRight: 15,
              marginTop: -10,
              backgroundColor: '#e3e6e4',
              height: 40,
              width: 150,
              borderRadius: 20,
              justifyContent: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 17,
                color: '#000',
                fontWeight: '500',
              }}>
              Explore more
            </Text>
            <AntDesign
              style={{marginLeft: 5, marginTop: -1}}
              name="right"
              size={25}
              color={'#000'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={handleCommunityRedirect}
        style={{position: 'absolute', bottom: 0, left: 20}}>
        <Image
          style={{height: 60, width: 60}}
          source={require('../assets/whatsapp.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RetailerHomeScreen;
