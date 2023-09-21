import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Colors from './Colors';
import Svg, {Path} from 'react-native-svg';

const TabBarButton = props => {
  const {route, children, accessibilityState, onPress} = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopLeftRadius: route === 'HOME' ? 10 : 0,
              },
            ]}
          />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={Colors.white}
            />
          </Svg>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopRightRadius: route === 'RECIPE' ? 10 : 0,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={styles.activeBtn}
          activeOpacity={1}>
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route === 'HOME' ? 10 : 0,
            borderTopRightRadius: route === 'RECIPE' ? 10 : 0,
          },
        ]}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default TabBarButton;
const styles = StyleSheet.create({
  activeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    top: -22,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  svgGapFiller: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
