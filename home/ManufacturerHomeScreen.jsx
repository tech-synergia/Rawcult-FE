import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar} from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManufacturerHomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState('');
  let user;
  (async () => {
    user = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(user);
    setUserInfo(loggedUser);
    // console.log("njnjbjbjbjbj", getToken);
  })();
  const searchRef = useRef();

  const image1 = require('../assets/first.jpg');
  const image2 = require('../assets/image3.jpeg');
  const image3 = require('../assets/image2.jpeg');
  const image4 = require('../assets/image3.jpeg');
  const image5 = require('../assets/third.jpg');
  const image6 = require('../assets/second.jpg');
  const image7 = require('../assets/third.jpg');
  const image8 = require('../assets/forth.jpg');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setData(response);
        // setOldData(response);
      });
  }, []);

  const onSearch = text => {
    let tempList = data.filter(item => {
      return item?.title.toLowerCase().indexOf(text.toLowerCase());
    });
  };

  const onChangeSearch = query => setSearchQuery(query);

  const carouselData = [
    {
      number: 1,
      imageSource: require('../assets/first.jpg'), // Replace with your image sources
    },
    {
      number: 2,
      imageSource: require('../assets/second.jpg'), // Replace with your image sources
    },
    {
      number: 3,
      imageSource: require('../assets/third.jpg'), // Replace with your image sources
    },
    {
      number: 4,
      imageSource: require('../assets/forth.jpg'),
      // Replace with your image sources
    },
    {
      number: 5,
      imageSource: require('../assets/fifth.jpg'),
      // Replace with your image sources
    },
    // ... add more data for each slide
  ];

  return (
    <View style={{marginBottom: 52, marginTop: 20}}>
      <View style={{marginLeft: 10, height: 40}}>
        <Text style={{fontSize: 15, fontWeight: '800'}}>
          <MaterialCommunityIcons name="hand-wave" size={25} color="#9a2aeb" />
          {'  '}
          Hello!
          {/* {userInfo.name} */}
        </Text>
      </View>
      <ImageBackground
        source={require('../assets/background.webp')}
        style={{
          height: 150,
          width: '95%',
          marginLeft: 18,
          paddingTop: 25,
          borderRadius: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('add')}>
          <Ionicons
            style={{marginLeft: 85}}
            name="add-circle-outline"
            size={60}
            color={'#9a2aeb'}
          />
        </TouchableOpacity>
        <Text style={{marginLeft: 50, fontWeight: '700', color: '#9a2aeb'}}>
          Add a new product
        </Text>
      </ImageBackground>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Searchbar
          style={{width: '88%'}}
          placeholder="Search your Products"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Ionicons
          style={{marginLeft: 5, marginTop: 10}}
          name="options-outline"
          size={30}
          color="#615f5f"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 240}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ProductCard
            product_name={'T-Shirt'}
            image={image1}
            product_price={'999.00'}
          />
          <ProductCard
            product_name={'Anarkali Suit'}
            image={image2}
            product_price={'345'}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => Alert.alert('200 Unit left')}>
            <ProductCard
              product_name={'Women Shirt'}
              image={image3}
              product_price={'345'}
            />
          </TouchableOpacity>
          <ProductCard
            product_name={'Men Suit'}
            image={image4}
            product_price={'345'}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ProductCard
            product_name={'Men Shirt'}
            image={image5}
            product_price={'345'}
          />
          <ProductCard
            product_name={'T-Shirt'}
            image={image6}
            product_price={'345'}
          />
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ProductCard
            product_name={'T-Shirt'}
            image={image7}
            product_price={'345'}
          />
          <ProductCard
            product_name={'T-Shirt'}
            image={image8}
            product_price={'345'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ManufacturerHomeScreen;
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
});
