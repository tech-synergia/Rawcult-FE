import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OrdersCard = ({
  image,
  product_name,
  product_color,
  product_size,
  product_quantity,
  product_amount,
  product_id,
}) => {
  // Initial quantity state

  return (
    <View
      style={{
        width: '90%',
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e6ecf7',
        alignSelf: 'center',
        margin: 10,
      }}>
      {/* <Rating rating={5} totalStars={5} number={"(5.0)"} /> */}

      <View style={{width: '30%', height: 150}}>
        <Image
          style={{
            height: 140,
            width: 100,
            borderRadius: 10,
            alignSelf: 'center',
            margin: 13,
          }}
          source={image}
        />
      </View>
      <View style={{width: '60%', margin: 15}}>
        <Text
          style={{
            fontSize: 13,
            color: '#0a0226',
            textAlign: 'auto',
            fontWeight: 'bold',
            marginTop: 5,
          }}>
          Product id: {product_id}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#555459',
            textAlign: 'auto',
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 30,
          }}>
          {product_name}
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: -15,
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 15,
              color: 'grey',
            }}>
            Color: {product_color}
          </Text>
          <Text style={{fontWeight: '500', fontSize: 15, color: 'grey'}}>
            Size: {product_size}
          </Text>
        </View>

        <Text
          style={{
            fontWeight: '300',
            fontSize: 15,
            marginTop: 5,
            fontWeight: '500',
            color: 'grey',
          }}>
          Quantity: {product_quantity}
        </Text>
        <Text
          style={{
            fontWeight: '300',
            fontSize: 15,
            marginTop: 5,
            fontWeight: '500',
            color: 'grey',
          }}>
          Amount:{''} <FontAwesome name="rupee" size={14} /> {product_amount}
        </Text>
      </View>
    </View>
  );
};

export default OrdersCard;
