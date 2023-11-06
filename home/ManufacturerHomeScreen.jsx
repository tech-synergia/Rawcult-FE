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
  BackHandler,
} from 'react-native';
import {useRoute, useIsFocused} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar} from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {Header} from '../components/Header';

const ManufacturerHomeScreen = ({navigation}) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [loginToken, setLOginToken] = useState('');
  const [SearchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    axios
      .get(`https://rawcult-be.vercel.app/products/search?q=${query}`)
      .then(response => {
        const result = response.data.map(val => ({
          id: val._id,
          title: val.name,
        }));
        setSearchData([...result, {title: 'view all'}]);
      })
      .catch(error => {
        console.error(error);
      });
  }, [query]);

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
        setListData(response?.data?.products);
      } else {
        Alert.alert('Error');
      }
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // console.log('imageeeeeee', data[0].image.length);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    fetchData();
  }, [userInfo, isFocused]);

  const handelSearch = value => {
    if (!value) {
      fetchData();
      setQuery('');
      return;
    }
    setQuery(value);
    const updatedData = listData.filter(val => {
      const name = val.name.toLowerCase();
      return name.includes(value.toLowerCase());
    });
    setData(updatedData);
  };

  return (
    <View style={{marginBottom: 52}}>
      <View style={{}}>
        <Header />
      </View>
      <ImageBackground
        source={require('../assets/background.webp')}
        style={{
          height: 160,
          width: '95%',
          marginLeft: 18,
          paddingTop: 25,
          borderRadius: 30,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('add', {addProduct: true})}>
          <Ionicons
            style={{marginLeft: 85}}
            name="add-circle-outline"
            size={60}
            color={'#006DFF'}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 50,
            fontWeight: '700',
            color: '#006DFF',
            fontSize: 17,
          }}>
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
          style={{width: '88%', borderRadius: 30}}
          placeholder="Search Products"
          value={query}
          onChangeText={handelSearch}
          // onIconPress={handelSearch}
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
            top: 300,
            borderColor: '#95359c',
            borderRadius: 10,
            width: '50%',
            backgroundColor: '#fff',
            right: 10,
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
          </View>
          <TouchableOpacity
            onPress={() => {
              const sortedProducts = data
                .slice()
                .sort((a, b) => a.price - b.price);
              setData(sortedProducts);
            }}>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#dee0e3',
                alignSelf: 'center',
                marginTop: 10,
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
          </TouchableOpacity>
          <View
            style={{
              height: 0.8,
              width: '100%',
              backgroundColor: '#dee0e3',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              const sortedProducts = data
                .slice()
                .sort((a, b) => b.price - a.price);
              setData(sortedProducts);
            }}>
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
          </TouchableOpacity>
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
                  marginBottom: 100,
                }}>
                {console.log('&&&&&&&&&***************>>>>>', data)}
                {data.map((item, index) => (
                  <ProductCard
                    key={index}
                    product_name={item?.name}
                    image={{uri: item?.image[0]}}
                    product_price={Number(item?.price).toFixed(2)}
                    productId={item?._id}
                    stocks={item?.stocks}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <ActivityIndicator
                style
                animating={true}
                color={MD2Colors.grey600}
              />
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
