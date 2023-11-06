import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({navigation}) => {
  const [userInfo, setUserInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loginToken, setLOginToken] = useState('');
  const [loggedUser, setLoggedUser] = useState('');

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
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Remove user data from AsyncStorage
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('acessToken');
              Alert.alert(
                'Logout Successful',
                'You have been successfully logged out.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Signin'),
                  },
                ],
              );
            } catch (error) {
              console.error('Error logging out:', error);
              // Handle any errors that occur during logout
              // You can show an error message or take other actions here
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={{marginTop: 30}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginBottom: 15,
        }}>
        MY ACCOUNT
      </Text>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#f0f1f2',
            padding: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <FontAwesome
              name="user-circle"
              size={50}
              color={'#313233'}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginTop: 10,
                marginLeft: 5,
                alignSelf: 'flex-start',
              }}
            />
          </TouchableOpacity>
          {loginToken ? (
            <View style={{marginTop: 10, marginLeft: 15, flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'grey',
                  }}>
                  {userInfo?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  {userInfo?.email}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{marginTop: 10, marginLeft: 15, marginBottom: 20}}>
              <TouchableOpacity
                style={{
                  width: 180,
                  height: 50,
                  marginLeft: 20,
                  backgroundColor: '#006DFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate('Signin')}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                  Login/Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        {loginToken ? (
          <TouchableOpacity onPress={() => navigation.navigate('myOrders')}>
            <View
              style={{
                backgroundColor: '#f0f1f2',
                padding: 10,
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 10,
              }}>
              <Ionicons name="reader" size={30} color={'#313233'} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                My Orders
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={{
                  backgroundColor: '#f0f1f2',
                  padding: 10,
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <Ionicons name="reader" size={30} color={'#313233'} />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                    marginTop: 3,
                    marginLeft: 10,
                  }}>
                  My Orders
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}>
                <View
                  style={{
                    position: 'absolute',
                    height: '35%',
                    bottom: 5,
                    borderColor: '#95359c',
                    borderRadius: 10,
                    width: '98%',
                    alignSelf: 'center',
                    backgroundColor: '#d6cae3',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 16, alignSelf: 'flex-end'}}>
                      <Entypo name="cross" size={35} color={'#000'} />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 20,
                      fontSize: 14,
                      color: '#53149c',
                      fontWeight: '600',
                    }}>
                    Login or Register to explore more and add it to your
                    wishlist.
                  </Text>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text
                      style={styles.loginButtonText}
                      onPress={() => {
                        navigation.navigate('Signin');
                        closeModal();
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.orText}>OR</Text>
                  </View>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text
                      style={styles.loginButtonText}
                      onPress={() => {
                        navigation.navigate('Signup');
                        closeModal();
                      }}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </>
        )}

        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        {loginToken ? (
          <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
            <View
              style={{
                backgroundColor: '#f0f1f2',
                padding: 10,
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 10,
              }}>
              <Ionicons name="heart" size={30} color={'#313233'} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                My Wishlist
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={{
                  backgroundColor: '#f0f1f2',
                  padding: 10,
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <Ionicons name="heart" size={30} color={'#313233'} />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                    marginTop: 3,
                    marginLeft: 10,
                  }}>
                  My Wishlist
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}>
                <View
                  style={{
                    position: 'absolute',
                    height: '35%',
                    bottom: 5,
                    borderColor: '#95359c',
                    borderRadius: 10,
                    width: '98%',
                    alignSelf: 'center',
                    backgroundColor: '#006DFF',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 16, alignSelf: 'flex-end'}}>
                      <Entypo name="cross" size={35} color={'grey'} />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 20,
                      fontSize: 14,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    Login or Register to explore more and add it to your
                    wishlist.
                  </Text>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text
                      style={styles.loginButtonText}
                      onPress={() => {
                        navigation.navigate('Signin');
                        closeModal();
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.orText}>OR</Text>
                  </View>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text
                      style={styles.loginButtonText}
                      onPress={() => {
                        navigation.navigate('Signup');
                        closeModal();
                      }}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </>
        )}
        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('about')}>
          <View
            style={{
              backgroundColor: '#f0f1f2',
              padding: 10,
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <FontAwesome name="address-card" size={23} color={'#313233'} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '400',
                color: '#000',
                marginTop: 3,
                marginLeft: 10,
              }}>
              About Us
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('help')}>
          <View
            style={{
              backgroundColor: '#f0f1f2',
              padding: 10,
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <MaterialCommunityIcons
              name="phone-in-talk"
              size={30}
              color={'#313233'}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '400',
                color: '#000',
                marginTop: 3,
                marginLeft: 10,
              }}>
              Help Centre
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('privacy')}>
          <View
            style={{
              backgroundColor: '#f0f1f2',
              padding: 10,
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <Ionicons name="shield-checkmark" size={30} color={'#313233'} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '400',
                color: '#000',
                marginTop: 3,
                marginLeft: 10,
              }}>
              Privacy Policy
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />
        {loginToken ? (
          <TouchableOpacity onPress={() => navigation.navigate('settings')}>
            <View
              style={{
                backgroundColor: '#f0f1f2',
                padding: 10,
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 10,
              }}>
              <Ionicons name="settings" size={28} color={'#313233'} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: '#dee0e3',
            alignSelf: 'center',
          }}
        />

        {loginToken ? (
          <View>
            <TouchableOpacity onPress={handleLogout}>
              <View
                style={{
                  backgroundColor: '#f0f1f2',
                  padding: 10,
                  flexDirection: 'row',
                  marginTop: 15,
                  marginBottom: 10,
                }}>
                <Ionicons name="log-out" size={30} color={'#313233'} />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                    marginTop: 3,
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 100,
                marginBottom: 50,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 60,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  flexDirection: 'row',
                  marginRight: 20,
                }}
                onPress={() => navigation.navigate('role')}>
                <MaterialCommunityIcons
                  name="cart-arrow-up"
                  size={24}
                  color={'#fff'}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Sell with us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          ''
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  orText: {
    fontSize: 17,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loginButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
