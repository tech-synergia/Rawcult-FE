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

const Cart = ({navigation}) => {
  const [quantity, setQuantity] = useState(100);
  const [loginToken, setLOginToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);
  console.log('jhhvgvvgvgvug', loginToken);
  const item = [];
  const western = require('../assets/image2.jpeg');
  const ethinic = require('../assets/image2.jpeg');
  const image4 = require('../assets/image3.jpeg');
  const image5 = require('../assets/image3.jpeg');

  //   return loginToken ? (
  return (
    <View style={{marginTop: 20, marginBottom: 65}}>
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
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '300',
              color: 'grey',
              marginBottom: 10,
            }}>
            You have {quantity} products in your Cart
          </Text>
          <ScrollView style={{marginTop: 10, marginBottom: 105}}>
            {/* <SafeAreaView style={{ marginBottom: 50 }}> */}

            <CartCard
              quantity={quantity}
              setQuantity={setQuantity}
              image={western}
              product_name={'Checked Shirt for women in Black and White'}
              product_color={'Black'}
              product_size={'S'}
              original_price={'999.00'}
              discounted_price={'699.00'}
            />
            <CartCard
              quantity={quantity}
              setQuantity={setQuantity}
              image={ethinic}
              product_name={'Designer Anarkali Suit'}
              product_color={'Pink'}
              product_size={'XS'}
              original_price={'2199.00'}
              discounted_price={'1799.00'}
            />
            <CartCard
              quantity={quantity}
              setQuantity={setQuantity}
              image={image4}
              product_name={'Suit for Men'}
              product_color={'Navy Blue'}
              product_size={'M'}
              original_price={'1699.00'}
            />
            <CartCard
              quantity={quantity}
              setQuantity={setQuantity}
              image={image5}
              product_name={'Checked Shirt for men in White And Red'}
              product_color={'White'}
              product_size={'S'}
              original_price={'799.00'}
              discounted_price={'499.00'}
            />
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
                  <FontAwesome name="rupee" size={14} /> 999.00
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
                  Discount
                </Text>
                <Text style={{fontSize: 18, color: 'grey', fontWeight: '400'}}>
                  <FontAwesome name="rupee" size={14} /> 299.00
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
                  <FontAwesome name="rupee" size={14} /> 49.00
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
                    <FontAwesome name="rupee" size={19} /> 999.00
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: '#6b6c6e',
                    }}>
                    Total Saving on this order
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#6b6c6e',
                    }}>
                    <FontAwesome name="rupee" size={14} /> 999.00
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
                      style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
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
            color={'#6932a8'}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              color: '#4c148c',
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
