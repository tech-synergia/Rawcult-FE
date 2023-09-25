import {View, Text} from 'react-native';
import React from 'react';

const Setting = () => {
  return (
    <View style={{marginTop: 20, marginBottom: 45}}>
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
        SETTINGS
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

export default Setting;
