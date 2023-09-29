import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

const ProductTypeCard = ({image, product_name, backgroundColor}) => {
  return (
    <View
      style={{
        height: 'auto',
        // padding: 15,
        width: 390,
        height: 192,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: backgroundColor,
        flexDirection: 'row',
        margin: 15,
        marginRight: 20,
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      {/* <View style={{width: '60%'}}> */}
      <Text
        style={{
          fontSize: 23,
          color: '#000',
          fontWeight: '700',
          alignSelf: 'center',
          marginLeft: 30,
        }}>
        {product_name}
      </Text>
      {/* </View> */}
      {/* <View style={{width: '40%'}}> */}
      <Image
        style={{
          width: 150,
          height: 190,
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          // marginLeft: 71,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        source={image}
      />
      {/* </View> */}
    </View>
  );
};

export default ProductTypeCard;
