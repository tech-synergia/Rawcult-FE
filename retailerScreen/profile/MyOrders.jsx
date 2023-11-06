import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyOrders = ({navigation}) => {
  return (
    <View style={{marginTop: 20, marginBottom: 45}}>
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
        }}>
        MY ORDERS
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
    </View>
  );
};

export default MyOrders;
