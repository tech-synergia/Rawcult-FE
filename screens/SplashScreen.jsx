import React from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';
import Logo from '../assets/Rawcult.png';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={{height: 320, width: 320, alignSelf: 'center', marginTop: 230}}
        source={require('../assets/title.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006DFF',
    height: '100%',
    width: '100%',
  },
});
