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
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}> */}
      <View>
        {/* <Ionicons
            style={{ color: "grey", marginLeft: 15 }}
            name="menu-sharp"
            size={35}
            color="#000"
          /> */}
        <Text style={{fontSize: 15, fontWeight: '800', marginLeft: 10}}>
          {loginToken ? (
            <>
              <MaterialCommunityIcons
                name="hand-wave"
                size={25}
                color="#9a2aeb"
              />
              {''} Hello! {userInfo?.name}
            </>
          ) : (
            <>
              <MaterialCommunityIcons
                name="hand-wave"
                size={25}
                color="#9a2aeb"
              />
              {'  '}
              Hello, let's shop!
            </>
          )}
        </Text>
      </View>
      {/* </TouchableOpacity> */}

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons
            style={styles.icon1}
            name="heart-outline"
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://mail.google.com/')}>
          <Ionicons
            style={styles.icon}
            name="notifications-outline"
            color="#000"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginBottom: -12,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 6,
    marginRight: 20,
    resizeMode: 'contain',
    flexDirection: 'row',
    color: 'grey',
  },
  icon1: {
    marginTop: 1,
    width: 30,
    height: 30,
    marginLeft: 8,
    resizeMode: 'contain',
    flexDirection: 'row',
    color: 'grey',
  },
});
