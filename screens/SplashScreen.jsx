import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Logo from '../assets/Rawcultlogo.png';
import LinearGradient from 'react-native-linear-gradient';

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
    height: '160%',
    width: '160%',
    marginTop: 60,
    marginRight: 70,
  },
});
