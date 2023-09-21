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
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      {/* <ScrollView style={{}}> */}
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
          <View style={{marginTop: 10, marginLeft: 15}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
              }}>
              Pooja Rai
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'grey',
              }}>
              pooja.k@opensenselabs.com
            </Text>
          </View>
        ) : (
          <View style={{marginTop: 10, marginLeft: 15, marginBottom: 20}}>
            <TouchableOpacity
              style={{
                width: 180,
                height: 50,
                marginLeft: 20,
                backgroundColor: '#ab76e8',
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

        <TouchableOpacity>
          <Ionicons
            style={{marginLeft: 130, marginTop: 13}}
            name="chevron-forward"
            size={35}
            color={'grey'}
          />
        </TouchableOpacity>
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
        <View
          style={{
            backgroundColor: '#f0f1f2',
            padding: 10,
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 10,
          }}>
          <TouchableOpacity>
            <Ionicons name="reader" size={30} />
          </TouchableOpacity>
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
              <Ionicons name="reader" size={30} />
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
                    <Entypo name="cross" size={35} color={'grey'} />
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
                  Login or Register to explore more and add it to your wishlist.
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
        <View
          style={{
            backgroundColor: '#f0f1f2',
            padding: 10,
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="heart" size={30} />
          </TouchableOpacity>
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
              <Ionicons name="heart" size={30} />
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
                  backgroundColor: '#d6cae3',
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
                    color: '#53149c',
                    fontWeight: '600',
                  }}>
                  Login or Register to explore more and add it to your wishlist.
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
      <View
        style={{
          backgroundColor: '#f0f1f2',
          padding: 10,
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 10,
        }}>
        <TouchableOpacity>
          <FontAwesome name="address-card" size={23} />
        </TouchableOpacity>
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
      <View
        style={{
          height: 0.8,
          width: '100%',
          backgroundColor: '#dee0e3',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: '#f0f1f2',
          padding: 10,
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 10,
        }}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="phone-in-talk" size={30} />
        </TouchableOpacity>
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
      <View
        style={{
          height: 0.8,
          width: '100%',
          backgroundColor: '#dee0e3',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: '#f0f1f2',
          padding: 10,
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 10,
        }}>
        <TouchableOpacity>
          <Ionicons name="shield-checkmark" size={30} />
        </TouchableOpacity>
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
      <View
        style={{
          height: 0.8,
          width: '100%',
          backgroundColor: '#dee0e3',
          alignSelf: 'center',
        }}
      />
      {loginToken ? (
        <View
          style={{
            backgroundColor: '#f0f1f2',
            padding: 10,
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 10,
          }}>
          <TouchableOpacity>
            <Ionicons name="settings" size={28} />
          </TouchableOpacity>
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
        <View
          style={{
            backgroundColor: '#f0f1f2',
            padding: 10,
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out" size={30} />
          </TouchableOpacity>
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
      ) : (
        ''
      )}
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
    backgroundColor: '#a160eb',
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
