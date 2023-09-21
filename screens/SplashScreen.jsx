import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../assets/image.png';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
});
