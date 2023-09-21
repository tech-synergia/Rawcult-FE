import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//   import Rating from "./Rating";
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemCard = ({image, product_name, product_price}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginToken, setLOginToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);
  console.log('tokkkuuuuuuu', loginToken);
  const navigation = useNavigation();
  const toggleLike = () => {
    if (loginToken) {
      setIsLiked(!isLiked);
    } else {
      setModalVisible(true);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View
      style={{
        height: 'auto',
        padding: 15,
        width: 160,
        height: 210,
        display: 'flex',
        borderColor: '#c2c3c4',
        borderWidth: 1,
        borderRadius: 5,
        // justifyContent: "center",
        // alignItems: "center",
        margin: 18,
      }}>
      {/* <Rating rating={5} totalStars={5} number={"(5.0)"} /> */}
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
        <Image
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
          }}
          source={image}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: '#6b6c6e',
          textAlign: 'justify',
          fontWeight: '600',
          marginTop: 3,
        }}>
        {product_name}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: 'grey',
          textAlign: 'center',
          fontWeight: '800',
        }}>
        <FontAwesome name="rupee" size={14} /> {product_price}
        {/* {console.log('loginnnnn', loginToken)}
        {loginToken ? (
          <Text style={{}}>
            <FontAwesome name="rupee" size={14} /> {product_price}
          </Text>
        ) : (
          ''
        )} */}
      </Text>
      <View
        style={{
          alignSelf: 'flex-end',
          marginBottom: 8,
        }}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={22}
            color={isLiked ? 'red' : 'black'}
          />
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
      </View>
    </View>
  );
};

export default ItemCard;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
