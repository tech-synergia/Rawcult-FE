import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddRemove = () => {
  const totalQuantity = 100;
  const [quantity, setQuantity] = useState(0); // Default quantity
  // const [availablelQuantity, setAvailablelQuantityy] = useState(totalQuantity);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 20) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert(
        'Quantity Limit',
        'Minimum quantity is 20',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity}>
        <Ionicons
          name="remove-outline"
          size={24}
          color={quantity === 20 ? '#ccc' : '#000'}
        />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity}>
        <Ionicons name="add-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default AddRemove;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 80,
    marginLeft: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
