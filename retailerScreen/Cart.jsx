import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CartCard from '../components/CartCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const Cart = ({navigation}) => {
  const route = useRoute();
  const data = route.params;
  const [totalQty, setTotalQty] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const [loginToken, setLOginToken] = useState();
  const [cartData, setCartData] = useState([]);
  const [id, setId] = useState('');
  let deliveryFee = 49;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://rawcult-be.vercel.app/cart/getUserItems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        setCartData(response?.data?.items);
        const quant = response?.data?.items?.reduce(
          (acc, curr) => (acc += Number(curr.totalQuantity)),
          0,
        );
        const paisa = response?.data?.items?.reduce(
          (acc, curr) => (acc += curr.price),
          0,
        );
        setTotalQty(quant);
        setTotalPrice(paisa);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      const user = await AsyncStorage.getItem('user');
      console.log('?????', user);
      setLOginToken(token);
      setId(JSON.parse(user)?.userId);
      console.log('kjpojoihiouhouvgoug', JSON.parse(user)?.userId);
    })();
  }, []);
  useEffect(() => {
    if (id && loginToken) {
      fetchData();
    }
  }, [id, loginToken]);

  return (
    <View style={{marginTop: 20}}>
      {data && data?.addToCart && (
        <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
          <Ionicons
            style={{marginLeft: 5}}
            name="arrow-back"
            size={35}
            color={'#14489c'}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 20,
          width: '100%',
          marginBottom: 5,
          marginTop: -10,
        }}>
        CART
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 10,
        }}
      />
      {loginToken ? (
        <>
          {/* <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '300',
              color: 'blue',
              marginBottom: 10,
            }}>
            {cartData.length
              ? `You have ${cartData?.length} products in your Cart.`
              : 'Your Cart is empty add some items'}
          </Text> */}
          <ScrollView style={{marginTop: 10, marginBottom: 150}}>
            {cartData?.map((item, index) =>
              item?.sizes?.map((cartItems, index) => (
                <CartCard
                  key={index}
                  quantity={cartItems?.quantity}
                  image={{uri: item?.image[0]}}
                  product_name={item?.productName}
                  product_color={cartItems?.color}
                  product_size={cartItems?.size}
                  original_price={Number(item?.price).toFixed(2)}
                />
              )),
            )}

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
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                  fontSize: 18,
                  margin: 20,
                }}>
                Price Details
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
                  Total Price
                </Text>
                <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                  <FontAwesome name="rupee" size={14} />
                  {(totalPrice * totalQty).toFixed(2)}
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
                  Delivery Charges
                </Text>
                <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                  <FontAwesome name="rupee" size={14} />
                  {deliveryFee.toFixed(2)}
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
                  <Text style={{fontSize: 20, fontWeight: '500'}}>
                    <FontAwesome name="rupee" size={19} />{' '}
                    {(totalPrice * totalQty + deliveryFee).toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('payment')}>
                  <View
                    style={{
                      width: '85%',
                      height: 50,
                      backgroundColor: '#000',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginTop: 25,
                      marginBottom: 20,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      <Ionicons name="cart" size={22} />
                      {'  '}
                      Place Order
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{marginTop: 300}}>
          <Fontisto
            style={{alignSelf: 'center', marginBottom: 20}}
            name="shopping-bag"
            size={60}
            color={'#006DFF'}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              color: '#006DFF',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Hey, it feels so light!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '800',
              color: '#535254',
            }}>
            There is nothing in your bag. Let's add some items.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
