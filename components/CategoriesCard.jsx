import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Rating from './Rating';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CategoriesCard() {
  return (
    <View
      style={{
        width: '95%',
        height: 'auto',
        backgroundColor: '#e2d3f2',
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 20,
      }}>
      <View>
        <Image
          style={{
            width: 130,
            height: 180,
            borderRadius: 10,
          }}
          source={require('../assets/first.jpg')}
        />
      </View>
      <View style={{marginLeft: 10}}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 10,
          }}>
          White T-shirt
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 16,
            fontWeight: '800',
            marginTop: 5,
            marginBottom: 5,
          }}>
          Nike
        </Text>
        <Rating rating={4} totalStars={4} number={20} />
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            // textAlign: 'justify',
            fontWeight: '700',
            marginLeft: 10,
          }}>
          <FontAwesome name="rupee" size={18} /> 999
        </Text>
      </View>
      <View style={{alignSelf: 'flex-end', marginLeft: 90, marginBottom: 10}}>
        <TouchableOpacity onPress={''}>
          <Ionicons name={'heart-outline'} size={30} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
