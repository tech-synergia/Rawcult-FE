import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

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
            fontSize: 12,
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
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: -15,
          }}>
          <Text style={{fontWeight: '300', fontSize: 15}}>
            Color: {product_color}
          </Text>
          <Text style={{marginLeft: 25, fontWeight: '300', fontSize: 15}}>
            Size: {product_size}
          </Text>
        </View>

        <Text
          style={{
            fontWeight: '300',
            fontSize: 15,
            marginTop: 5,
            fontWeight: '400',
          }}>
          Quantity: {product_quantity}
        </Text>
        <Text
          style={{
            fontWeight: '300',
            fontSize: 15,
            marginTop: 5,
            fontWeight: '500',
          }}>
          Amount: {product_amount}
        </Text>
      </View>
    </View>
  );
};

export default OrdersCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
