import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const ImageSlider = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const newCurrentIndex = Math.round(
      contentOffset.x / Dimensions.get('window').width,
    );
    setCurrentIndex(newCurrentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        ref={scrollViewRef}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    // width: Dimensions.get('window').width,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // width: Dimensions.get('window').width,
    width: 300,
    height: 200,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
});

export default ImageSlider;
