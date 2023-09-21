import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FormItem} from 'react-native-form-component';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';
import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddBabyScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [genderBorder, setGenderBorder] = useState('');
  const [gender, setGender] = useState('female');
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [image, setImage] = useState(null);

  const prev = (
    <Ionicons name="arrow-back-circle-sharp" color="#d098d6" size={45} />
  );
  const dob = (
    <Entypo
      style={{marginLeft: 10}}
      name="calendar"
      size={27}
      color="#a56be8"
    />
  );
  const male = <FontAwesome name="male" color="#549d9e" size={30} />;
  const female = <FontAwesome name="female" color="#7e529c" size={30} />;
  const Camera = <Entypo name="camera" size={30} color="#fff" />;
  const Camera1 = <Entypo name="camera" size={30} color="blue" />;
  const gallery = <MaterialIcons name="perm-media" size={30} color="blue" />;
  const close = <Entypo name="circle-with-cross" size={25} color="blue" />;

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  const dateOfBirth = moment(date).format('DD/MM/YYYY');

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImage(result);
    console.log(result);
  };

  const openGallery = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'});
    setImage(result);

    console.log(result.assets[0].fileName, 'iiiiiiiii');
  };

  const userCollection = firestore().collection('babies');

  const babyDetail = () => {
    userCollection
      .add({
        Name: name,
        Image: image,
        DateOfBirth: dateOfBirth,
        Gender: gender,
      })
      .then(() => {
        alert('Baby added!');
        navigation.navigate('Main');
      });
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Before')}>
        <Text style={{paddingBottom: 20, marginLeft: 15}}>{prev}</Text>
      </TouchableOpacity>
      <View style={{marginBottom: 30}}>
        <Text style={styles.heading}>Add new baby</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: 50,
        }}>
        <TouchableOpacity
          onPress={() => {
            setGenderBorder('girlGender');
            setGender('Girl');
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 50,
              backgroundColor: '#f7f2f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 15,
              marginTop: 10,
              borderColor:
                genderBorder === 'girlGender'
                  ? 'rgb(153,108,173)'
                  : 'rgba(0,0,0,0)',

              borderWidth: 2.5,
            }}>
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 50,
                backgroundColor: '#edece6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 0,
                borderColor: '#edece6',

                borderWidth: 2.5,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: '#efd7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 0,
                }}>
                <Text style={{textAlign: 'center', color: '#529c97'}}>
                  {female}
                </Text>
                <Text style={{color: '#996cad'}}>Girl</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {!image ? (
          <TouchableOpacity onPress={() => setModal(true)}>
            <View
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: '#d8baf7',
                marginBottom: 10,
              }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                  setModal(false);
                }}>
                <View
                  style={{
                    position: 'absolute',
                    height: '25%',
                    bottom: 0,
                    borderColor: '#95359c',
                    borderRadius: 10,
                    width: '98%',
                    alignSelf: 'center',
                    backgroundColor: '#d9bdf2',
                  }}>
                  <Text>Select Image</Text>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      padding: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        openCamera();
                      }}>
                      <Text style={{fontSize: 15}}>{Camera1} Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        openGallery();
                      }}>
                      {console.log(picture, '>>>>>')}
                      <Text style={{fontSize: 15}}>
                        {gallery} Choose from Library
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModal(false)}
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 16}}>{close}CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  margin: 40,
                }}>
                {Camera}
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  margin: -30,
                  marginTop: -35,
                  color: 'black',
                  fontWeight: '600',
                }}>
                +Add Photo
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={{}}
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: '#d8baf7',
                marginBottom: 10,
              }}
            />
            {/* {console.log("image", updatedImage)} */}
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            setGenderBorder('boyGender');
            setGender('Boy');
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 50,
              backgroundColor: '#f7f2f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
              marginTop: 10,
              borderColor:
                genderBorder === 'boyGender'
                  ? 'rgb(132,186,186)'
                  : 'rgba(0,0,0,0)',

              borderWidth: 2.5,
            }}>
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 50,
                backgroundColor: '#edece6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 0,
                borderColor: '#edece6',

                borderWidth: 2.5,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: '#9bded9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 0,
                }}>
                <Text style={{textAlign: 'center', color: '#529c97'}}>
                  {male}
                </Text>
                <Text style={{color: '#529c97'}}>Boy</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <FormItem
          placeholder="Enter Baby Name"
          isRequired
          value={name}
          onChangeText={name => setName(name)}
          asterik
        />
      </View>

      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.form1}>
          <DatePickerModal
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
          <Text style={styles.date}>{dateOfBirth}</Text>
        </View>
      </TouchableOpacity>

      <View style={{width: '90%', height: 150, paddingLeft: 40}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 40,
            color: 'grey',
          }}>
          Human milk is secreted through your mammary glands, which are located
          in your breasts.
        </Text>
      </View>
      <View style={{alignSelf: 'center', marginTop: -50, width: '70%'}}>
        <Button icon="file" mode="contained" onPress={() => babyDetail()}>
          Save Details
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Main')}>
          Cancel, do not save
        </Button>
        <View
          style={{
            height: 1,
            width: 135,
            backgroundColor: 'grey',
            alignSelf: 'center',
            marginTop: -10,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '400',
    padding: 20,
  },
  form: {
    height: 50,
    width: '80%',
    marginBottom: 30,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'center',
  },
  form1: {
    height: 50,
    width: '80%',
    marginBottom: 30,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingTop: 8,
  },
  date: {
    marginTop: 8,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '400',
  },
});
