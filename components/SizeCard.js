import {View, Text} from 'react-native';
import React from 'react';

const SizeCard = ({size, backgroundColor, textColor}) => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        borderWidth: 1.5,
        borderRadius: 20,
        backgroundColor: {backgroundColor},
        marginLeft: 10,
      }}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 10,
          fontWeight: '600',
          color: {textColor},
        }}>
        {size}
      </Text>
    </View>
  );
};

export default SizeCard;
