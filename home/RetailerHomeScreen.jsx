import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Header} from '../components/Header';
import ItemCard from '../components/ItemCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

const RetailerHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([
    require('../assets/second.jpg'),
    require('../assets/image2.jpeg'),
    require('../assets/image3.jpeg'),
  ]);

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

  useEffect(() => {
    fetchData();
  }, []);
  const image1 = require('../assets/first.jpg');
  //   const image2 = require('../assets/image1.avif');
  const image3 = require('../assets/image2.jpeg');
  const image4 = require('../assets/image3.jpeg');
  //   const image5 = require('../assets/image4.avif');
  const image6 = require('../assets/second.jpg');
  const image7 = require('../assets/third.jpg');
  const image8 = require('../assets/forth.jpg');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 30}}>
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
            style={{width: '88%'}}
            placeholder="Search Products"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Ionicons
            style={{marginLeft: 3, marginTop: 10}}
            name="options-outline"
            size={30}
            color="#615f5f"
          />
        </View>
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
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {/* {data.map((item, index) => ( */}
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          <ItemCard
            // key={index}
            // product_name={item?.name}
            product_name={'Shirt'}
            image={image1}
            product_price={1000}
          />
          {/* ))} */}
        </View>
      </View>
    </ScrollView>
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
});
