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
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Header} from '../components/Header';
import ItemCard from '../components/ItemCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

const RetailerHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
  console.log('daaa', data);
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              style={{marginLeft: 3, marginTop: 10}}
              name="options-outline"
              size={30}
              color="#615f5f"
            />
          </TouchableOpacity>
        </View>
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
        {data ? (
          <>
            <View
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {data.map((item, index) => (
                <ItemCard
                  key={index}
                  product_name={item?.name}
                  image={image1}
                  product_price={item?.price}
                  productId={item?._id}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </>
        )}
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
