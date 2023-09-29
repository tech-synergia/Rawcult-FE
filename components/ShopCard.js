import {View, Text, Image} from 'react-native';
import React from 'react';

export default function ShopCard({image, product_type}) {
  return (
    <View
      style={{
        height: 120,
        width: 150,
        marginBottom: 30,
        borderRadius: 10,
      }}>
      <Image
        style={{height: 100, width: 150, borderRadius: 10}}
        source={image}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: '500',
          color: '#000',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {product_type}
      </Text>
    </View>
  );
}
