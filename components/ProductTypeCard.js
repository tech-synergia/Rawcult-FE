import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

const ProductTypeCard = ({image, product_name}) => {
  return (
    <View>
      <View
        style={{
          height: 'auto',
          // padding: 15,
          width: 160,
          height: 190,
          borderRadius: 10,
          display: 'flex',
          borderWidth: 2,
          borderColor: '#c2c3c4',
          // justifyContent: "center",
          // alignItems: "center",
          margin: 15,
        }}>
        {/* <Rating rating={5} totalStars={5} number={"(5.0)"} /> */}

        <Image
          style={{
            width: 150,
            height: 180,
            alignSelf: 'center',
          }}
          source={image}
        />
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#6b6c6e',
          textAlign: 'center',
          fontWeight: '700',
          marginTop: 3,
        }}>
        {product_name}
      </Text>
    </View>
  );
};

export default ProductTypeCard;
