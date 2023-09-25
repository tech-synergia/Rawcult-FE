import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Rating = ({rating, totalStars, number}) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      const isFilled = i <= rating;

      stars.push(
        <Ionicons
          key={i}
          name={isFilled ? 'star' : 'star-outline'}
          size={20}
          color={isFilled ? 'gold' : 'gray'}
        />,
      );
    }

    return stars;
  };

  return (
    <View style={styles.starContainer}>
      <Text style={{fontSize: 20}}>
        {renderStars()}({number})
      </Text>
    </View>
  );
};

export default Rating;
const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
