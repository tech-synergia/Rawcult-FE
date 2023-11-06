import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import OrdersCard from '../components/OrdersCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = () => {
  const [quantity, setQuantity] = useState(100);
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState('');

  let user;

  console.log(userId, 'lllllll');
  const fetchData = async () => {
    user = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(user);
    try {
      const response = await axios.get(
        `https://rawcult-be.vercel.app/orders/getMnfOrders/${loggedUser?.userId}`,
      ); // Replace with your API endpoint
      if (response.status === 200) {
        setOrders(response?.data?.ordersWithDetails);
      } else {
        Alert.alert('Error', response?.data?.msg);
      }
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('first', orders);
  useEffect(() => {
    fetchData();
  }, []);
  const item = [];
  const western = require('../assets/image2.jpeg');
  const ethinic = require('../assets/image3.jpeg');
  const image4 = require('../assets/image3.jpeg');
  const image5 = require('../assets/image2.jpeg');

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginTop: 10,
        }}>
        ORDERS
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
          marginBottom: 15,
          marginTop: 15,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: 'red',
          marginTop: 300,
        }}>
        No new Orders for now!
      </Text>
      {/* <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "300",
            color: "grey",
            marginBottom: 10,
          }}
        >
          You have {quantity} orders
        </Text> */}
      {orders.map((item, index) => (
        <ScrollView key={index} style={{marginTop: 10, marginBottom: 105}}>
          {/* <SafeAreaView style={{ marginBottom: 50 }}> */}
          {item?.orderItems?.map((product, i) => (
            <View key={i}>
              {product?.size?.map((item, i) => (
                <OrdersCard
                  key={i}
                  product_quantity={item?.quantity}
                  product_id={product?._id}
                  image={{uri: product?.image}}
                  product_name={product?.name}
                  product_color={`${product?.color} ,`}
                  product_size={item?.size}
                  product_amount={Number(product?.price).toFixed(2)}
                />
              ))}
            </View>
          ))}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 18,
                marginLeft: 20,
              }}>
              Shipping Address:
            </Text>
            <Text
              style={{
                color: 'grey',
                fontWeight: '700',
                fontSize: 18,
                marginLeft: 5,
              }}>
              {item?.user?.shopAddress}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#d2cdd4',
              alignSelf: 'center',
              marginBottom: 5,
              marginTop: 30,
            }}
          />

          <View style={{marginBottom: 30}}>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 18,
                margin: 20,
              }}>
              Amount Details
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                Total Amount
              </Text>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                <FontAwesome name="rupee" size={14} />{' '}
                {Number(item?.subtotal).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                Total Tax
              </Text>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                <FontAwesome name="rupee" size={14} />{' '}
                {Number(item?.tax).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                Shipping Charges
              </Text>
              <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                <FontAwesome name="rupee" size={14} />{' '}
                {Number(item?.shippingFee).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#e3ebfa',
                width: '98%',
                height: 'auto',
                marginTop: 20,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#e3ebfa',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 23, fontWeight: '500'}}>Total:</Text>
                <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
                  <FontAwesome name="rupee" size={19} />{' '}
                  {Number(item?.total).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity>
                <View
                  style={{
                    width: '80%',
                    height: 50,
                    backgroundColor: '#46bd5c',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 17, fontWeight: '500'}}>
                    <Feather name="check-circle" size={20} />
                    {'  '}
                    Approve Order
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ))}
    </SafeAreaView>
  );
};

export default Orders;
