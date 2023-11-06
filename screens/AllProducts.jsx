import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useState, useEffect} from 'react';
import ItemCard from '../components/ItemCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Searchbar} from 'react-native-paper';

const AllProducts = ({navigation}) => {
  const [data, setData] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
  const image1 = require('../assets/forth.jpg');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://rawcult-be.vercel.app/products',
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
  useEffect(() => {
    fetchData();
  }, []);

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
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginBottom: 10,
        }}>
        ALL PRODUCTS ({data?.length})
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
        }}
      />
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
          onChangeText={handelSearch}
          // onIconPress={handelSearch}
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
            height: 'auto',
            bottom: 530,
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
                .sort((a, b) => a.price - b.price);
              setData(sortedProducts);
            }}>
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
      <ScrollView>
        {console.log('>>>>>>>>>><<<<<<<<<<<<<<', data)}
        {data?.length ? (
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
                  image={{uri: item?.image[0]}}
                  product_price={Number(item?.price).toFixed(2)}
                  productId={item?._id}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <ActivityIndicator
              style={{width: 400, height: 400, marginTop: 100}}
              animating={true}
              color={MD2Colors.blue600}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AllProducts;
