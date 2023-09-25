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
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar} from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const ManufacturerHomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [loginToken, setLOginToken] = useState('');
  let user;

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
      user = await AsyncStorage.getItem('user');
      const loggedUser = JSON.parse(user);
      setUserInfo(loggedUser);
      // console.log("njnjbjbjbjbj", getToken);
    })();
  }, []);
  const image1 = require('../assets/first.jpg');
  const image2 = require('../assets/image3.jpeg');
  const image3 = require('../assets/image2.jpeg');
  const image4 = require('../assets/image3.jpeg');
  const image5 = require('../assets/third.jpg');
  const image6 = require('../assets/second.jpg');
  const image7 = require('../assets/third.jpg');
  const image8 = require('../assets/forth.jpg');

  const id = userInfo?.userId;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://rawcult-be.vercel.app/products/userProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            'Content-Type': 'application/json', // Set the content type as per your API's requirements
          },
        },
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
    if (!userInfo) {
      return;
    }
    fetchData();
  }, [userInfo]);

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
          // onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            style={{marginLeft: 5, marginTop: 10}}
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
            height: 'auto',
            bottom: 390,
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
              marginBottom: 20,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 240}}>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
          {data?.length ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {data.map((item, index) => (
                  <ProductCard
                    key={index}
                    product_name={item?.name}
                    image={image2}
                    product_price={item?.price}
                    productId={item?._id}
                    stocks={item?.stocks}
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
