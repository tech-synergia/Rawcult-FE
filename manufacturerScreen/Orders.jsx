import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import OrdersCard from '../components/OrdersCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Orders = () => {
  const [quantity, setQuantity] = useState(100);
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
        }}>
        ORDERS
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
      <ScrollView style={{marginTop: 10, marginBottom: 105}}>
        {/* <SafeAreaView style={{ marginBottom: 50 }}> */}

        <OrdersCard
          product_quantity={20}
          product_id={'64d60277b23dad418d945f0d'}
          image={western}
          product_name={'Checked Shirt for women in Black and White'}
          product_color={'Black'}
          product_size={'S'}
          product_amount={'999.00'}
        />
        <OrdersCard
          product_quantity={20}
          product_id={'64d60277b23dad418d945f0d'}
          image={ethinic}
          product_name={'Checked Shirt for women in Black and White'}
          product_color={'Black'}
          product_size={'S'}
          product_amount={'999.00'}
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
              Total Tax
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
                <Text style={{color: '#fff', fontSize: 17, fontWeight: '500'}}>
                  <Feather name="check-circle" size={20} />
                  {'  '}
                  Approve Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
