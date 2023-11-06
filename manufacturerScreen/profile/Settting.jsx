import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Setting = ({navigation}) => {
  return (
    <View style={{marginTop: 20, marginBottom: 45}}>
      <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
        <Ionicons
          style={{marginLeft: 5, color: 'blue'}}
          name="arrow-back"
          size={35}
          color={'#fff'}
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
          marginTop: -10,
        }}>
        SETTINGS
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default Setting;
