import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

// import firestore from '@react-native-firebase/firestore';

export const Header = ({props}) => {
  const navigation = useNavigation();
  const [loginToken, setLOginToken] = useState('');
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);

  let user;
  (async () => {
    user = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(user);
    setUserInfo(loggedUser);
    // console.log("njnjbjbjbjbj", getToken);
  })();
  // console.log('userrr', userInfo, loginToken);
  return (
    <LinearGradient
      colors={['#ff66c4', '#5170ff']} // Array of gradient colors
      start={{x: 0, y: 0}} // Start point of the gradient
      end={{x: 1, y: 0}} // End point of the gradient
      style={styles.container}>
      {loginToken ? (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: -10,
            height: 55,
            borderRadius: 10,
          }}>
          <Image
            style={{
              height: '98%',
              backgroundColor: '#fff',
              width: 50,
              opacity: 0.78,
              borderRadius: 10,
              marginLeft: 12,
            }}
            source={require('../assets/Rawcult.png')}
          />
        </View>
      ) : (
        <Image source={require('../assets/Rawcult.png')} />
      )}

      <Text
        style={{
          color: '#fff',
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: -170,
        }}>
        Rawcult
      </Text>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons
            style={styles.icon1}
            name="heart-outline"
            size={30}
            color={'#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons
            style={styles.icon}
            name="notifications-outline"
            color={'#fff'}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 55,
    marginTop: -30,
    marginBottom: 10,
    flex: 1,
    marginLeft: -10,
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    // marginBottom: -12,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 6,
    marginRight: 20,
    resizeMode: 'contain',
    flexDirection: 'row',
  },
  icon1: {
    marginTop: 1,
    width: 30,
    height: 30,
    marginLeft: 8,
    resizeMode: 'contain',
    flexDirection: 'row',
  },
});
