import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WishlistScreen({navigation}) {
  const [loginToken, setLOginToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);
  return (
    <View>
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
          height: 25,
          width: '100%',
          marginBottom: 5,
        }}>
        WISHLIST
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
      {loginToken ? (
        <>
          <Text>WishlistScreen</Text>
        </>
      ) : (
        <View style={{marginTop: 300}}>
          <MaterialCommunityIcons
            style={{alignSelf: 'center', marginBottom: 20}}
            name="hand-heart"
            size={60}
            color={'#d94150'}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              color: '#4c148c',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Hey, it feels so light!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '800',
              color: '#535254',
            }}>
            There is nothing in your Wishlist. Let's add some items.
          </Text>
        </View>
      )}
    </View>
  );
}
