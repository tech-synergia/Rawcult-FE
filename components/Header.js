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
import Entypo from 'react-native-vector-icons/Entypo';

// import firestore from '@react-native-firebase/firestore';

export const Header = ({props}) => {
  const navigation = useNavigation();
  const [loginToken, setLOginToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    <View // End point of the gradient
      style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 58,
          marginTop: 1,
        }}>
        {/* <Image
          style={{
            height: '98%',
            // backgroundColor: '#fff',
            width: 50,
            // opacity: 0.9,
            borderRadius: 7,
            marginLeft: 15,
          }}
          source={require('../assets/Rawcult.png')}
        /> */}
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 20,
          }}>
          Rawcult
        </Text>
      </View>
      {userInfo?.role === 'manufacturer' ? (
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              style={styles.icon1}
              name="call-outline"
              size={30}
              color={'#fff'}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: 'auto',
                  top: 60,
                  borderColor: '#95359c',
                  borderRadius: 10,
                  width: '65%',
                  backgroundColor: '#dfe6f2',
                  right: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    alignItems: 'center',
                  }}>
                  <Entypo
                    style={{
                      alignSelf: 'flex-end',
                      color: '#000',
                    }}
                    name="cross"
                    size={30}
                    color={'grey'}
                  />
                </TouchableOpacity>
                <View style={{marginTop: -10, marginBottom: 10}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Contact Us
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: 35,
                      marginBottom: 10,
                    }}>
                    <Ionicons name="call" color={'blue'} size={30} />
                    <Text
                      style={{
                        color: '#595a5c',
                        fontSize: 16,
                        marginTop: 3,
                      }}>
                      +91-8700424741
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 35,
                      marginBottom: 10,
                    }}>
                    <Ionicons name="mail" color={'blue'} size={30} />
                    <Text
                      style={{
                        color: '#595a5c',
                        fontSize: 16,
                        marginTop: 3,
                      }}>
                      rawcult.team@gmail.com
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                userInfo?.role === 'manufacturer' ? 'Notify' : 'Notification',
              )
            }>
            <Ionicons
              style={styles.icon}
              name="notifications-outline"
              color={'#fff'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              style={styles.icon1}
              name="call-outline"
              size={30}
              color={'#fff'}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: 'auto',
                  top: 60,
                  borderColor: '#95359c',
                  borderRadius: 10,
                  width: '65%',
                  backgroundColor: '#dfe6f2',
                  right: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    alignItems: 'center',
                  }}>
                  <Entypo
                    style={{
                      alignSelf: 'flex-end',
                      color: '#000',
                    }}
                    name="cross"
                    size={30}
                    color={'grey'}
                  />
                </TouchableOpacity>
                <View style={{marginTop: -10, marginBottom: 10}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Contact Us
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginLeft: 35,
                      marginBottom: 10,
                    }}>
                    <Ionicons name="call" color={'blue'} size={30} />
                    <Text
                      style={{
                        color: '#595a5c',
                        fontSize: 16,
                        marginTop: 3,
                      }}>
                      +91-8700424741
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 35,
                      marginBottom: 10,
                    }}>
                    <Ionicons name="mail" color={'blue'} size={30} />
                    <Text
                      style={{
                        color: '#595a5c',
                        fontSize: 16,
                        marginTop: 3,
                      }}>
                      rawcult.team@gmail.com
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#006DFF',
    // marginTop: -30,
    // marginBottom: 10,
    // flex: 1,
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
