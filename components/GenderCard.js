import {View, Text, Image} from 'react-native';
import React from 'react';

export default function GenderCard({image, backgroundColor, gender}) {
  return (
    <View>
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          backgroundColor: backgroundColor,
          marginTop: 20,
        }}>
        <Image
          style={{width: 70, alignSelf: 'center', height: 100}}
          source={image}
        />
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {gender}
      </Text>
    </View>
  );
}
