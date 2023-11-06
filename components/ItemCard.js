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

const ItemCard = ({image, product_name, product_price, productId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginToken, setLOginToken] = useState('');

  console.log('proooooo', productId);

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
        // backgroundColor: 'red',
        height: 'auto',
        padding: 15,
        width: 160,
        height: 'auto',
        display: 'flex',
        borderColor: '#c2c3c4',
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        // alignItems: "center",
        margin: 18,
      }}>
      {/* <Rating rating={5} totalStars={5} number={"(5.0)"} /> */}
      <View style={{position: 'relative'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', {id: productId})}>
          <Image
            style={{
              width: 160,
              height: 162,
              alignSelf: 'center',
              marginTop: -15,
            }}
            source={image}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: -8, // Adjust the top position as needed
            right: -5,
          }}>
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={25}
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
          color: '#000',
          textAlign: 'justify',
          fontWeight: '800',
        }}>
        <FontAwesome name="rupee" size={14} /> {product_price}
      </Text>
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
