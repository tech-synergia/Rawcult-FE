import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesCard from '../components/CategoriesCard';

export default function WomenBottomWearScreen({navigation}) {
  return (
    <View style={{marginTop: 10, marginBottom: 100}}>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginBottom: 10,
        }}>
        WOMEN'S BOTTOM WEAR
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
          <CategoriesCard />
        </TouchableOpacity>
        <CategoriesCard />
        <CategoriesCard />
        <CategoriesCard />
        <CategoriesCard />
      </ScrollView>
    </View>
  );
}
