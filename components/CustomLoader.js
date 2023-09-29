import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

const CustomLoader = ({visible, message, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose()}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={() => onClose()}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;
