import 'react-native-gesture-handler';
import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();
    console.log({token});
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
