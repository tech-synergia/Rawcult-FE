import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [userInfo, setUserInfo] = useState('');
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
                    onPress: () => {
                      console.log(
                        'signin~~~~~~~~~~',
                        AsyncStorage.getItem('user'),
                      );
                      console.log(
                        '>>>>>>>>>>>>>>>>>>>',
                        AsyncStorage.getItem('acessToken'),
                      );

                      return navigation.navigate('Signin');
                    },
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
    <View style={{marginTop: 20}}>
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
        <View style={{marginTop: 10, marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
            }}>
            {/* {userInfo?.name} */}
            Pooja Kumari
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'grey',
            }}>
            {/* {userInfo?.email} */}
            pooja@gmail.com
          </Text>
        </View>
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
          All Orders
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
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleLogout}>
          <Ionicons name="log-out" size={30} />
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
      {/* <View>
              <TouchableOpacity>
                <View
                  style={{
                    width: "30%",
                    height: 50,
                    backgroundColor: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
                    <Ionicons name="person-outline" size={22} />
                    {"  "}
                    Details
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    width: "30%",
                    height: 50,
                    backgroundColor: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
                    <MaterialCommunityIcons name="shopping-outline" size={22} />
                    {"  "}
                    Orders
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default Profile;
