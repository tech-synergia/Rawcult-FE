import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PaymentOptions({navigation}) {
  return (
    <View style={{marginTop: 10}}>
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
          marginTop: -10,
        }}>
        PAYMENT
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
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          marginBottom: 5,
          marginLeft: 20,
        }}>
        You can do the payment through scanning the below scanner:
      </Text>
      <Image
        style={{height: 400, width: 300, alignSelf: 'center', marginTop: 20}}
        source={require('../assets/scanner.jpeg')}
      />
    </View>
  );
}
