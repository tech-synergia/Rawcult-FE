import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CartCard = ({
  image,
  product_name,
  product_color,
  product_size,
  original_price,
  quantity,
  setQuantity,
}) => {
  // Initial quantity state

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 100) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert(
        'Quantity Limit',
        'Minimum quantity is 100',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  return (
    <View
      style={{
        width: '90%',
        height: 180,
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
            fontSize: 15,
            color: '#6b6c6e',
            textAlign: 'auto',
            fontWeight: 'bold',
            marginTop: 5,
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text style={{fontWeight: '700', color: 'green', marginTop: 5}}>
              <FontAwesome name="rupee" size={14} /> {original_price}
            </Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              //   disabled={quantity === 100}
            >
              <Ionicons
                name="remove-outline"
                size={24}
                color={quantity === 100 ? 'grey' : 'black'}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
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
