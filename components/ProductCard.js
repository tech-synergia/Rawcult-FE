import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

const ProductCard = ({
  image,
  product_name,
  product_price,
  stocks,
  productId,
}) => {
  const navigation = useNavigation();
  const [loginToken, setLOginToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);
  return (
    <View
      style={{
        height: 'auto',
        padding: 15,
        width: 160,
        height: 200,
        display: 'flex',
        borderColor: '#c2c3c4',
        borderWidth: 1,
        borderRadius: 5,
        // justifyContent: "center",
        // alignItems: "center",
        margin: 18,
      }}>
      {/* <Rating rating={5} totalStars={5} number={"(5.0)"} /> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', {id: productId})}>
        <Image
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
          }}
          source={image}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: '#6b6c6e',
          textAlign: 'center',
          marginTop: 5,
          fontWeight: '600',
          marginTop: 3,
        }}>
        {product_name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            // textAlign: 'justify',
            marginTop: 5,
            fontWeight: '700',
          }}>
          <FontAwesome name="rupee" size={14} /> {product_price}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            textAlign: 'justify',
            marginTop: 5,
            fontWeight: '400',
            color: '#341f4d',
          }}>
          {stocks} Unit
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
