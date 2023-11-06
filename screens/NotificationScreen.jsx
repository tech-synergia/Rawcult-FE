import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen({navigation}) {
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
        NOTIFICATION
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
          <Text>Notifications</Text>
        </>
      ) : (
        <View style={{marginTop: 200}}>
          <AntDesign
            style={{alignSelf: 'center', marginBottom: 20}}
            name="notification"
            size={60}
            color={'#006DFF'}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#000',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            You're missing out.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '800',
              color: '#535254',
              width: '50%',
              marginLeft: 100,
            }}>
            Sign in to view personalised notifications and offers.
          </Text>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              marginLeft: 120,
              backgroundColor: '#006DFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
