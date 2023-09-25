import * as React from 'react';
import {
  SafeAreaView,
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ProductTypeCard from '../components/ProductTypeCard';
import {useNavigation} from '@react-navigation/native';
const womenBottom = require('../assets/womenBottom.webp');
const womenTop = require('../assets/image2.jpeg');
const womenCasual = require('../assets/womenCasual.webp');
const womenFormal = require('../assets/womenFormal.jpeg');
const menBottom = require('../assets/menBottom.jpeg');
const menTop = require('../assets/menTop.jpeg');
const menCasual = require('../assets/menCasual.jpeg');
const menFormal = require('../assets/image3.jpeg');
const kidsBottom = require('../assets/kidsBottom.jpeg');
const kidsTop = require('../assets/kidsTop.jpeg');
const kidsCasual = require('../assets/kidsCasual.jpeg');
const kidsFormal = require('../assets/kidsFormal.webp');
const menAccess = require('../assets/menAcess.jpeg');
const womenAccess = require('../assets/womenAcess.webp');
const kidsAcess = require('../assets/kidsAcess.jpeg');
const kidsShoe = require('../assets/kidsShoe.jpeg');

const FirstRoute = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('womenTop')}>
          <ProductTypeCard image={womenTop} product_name={'Top Wear'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('womenBottom')}>
          <ProductTypeCard image={womenBottom} product_name={'Bottom Wear'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ProductTypeCard image={womenCasual} product_name={'Casual Wear'} />
        <ProductTypeCard image={womenFormal} product_name={'Formal Wear'} />
      </View>
    </>
  );
};

const SecondRoute = () => (
  <>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={menTop} product_name={'Top Wear'} />
      <ProductTypeCard image={menBottom} product_name={'Bottom Wear'} />
    </View>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={menCasual} product_name={'Casual Wear'} />
      <ProductTypeCard image={menFormal} product_name={'Formal Wear'} />
    </View>
  </>
);
const thirdRoute = () => (
  <>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={kidsTop} product_name={'Top Wear'} />
      <ProductTypeCard image={kidsBottom} product_name={'Bottom Wear'} />
    </View>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={kidsCasual} product_name={'Casual Wear'} />
      <ProductTypeCard image={kidsFormal} product_name={'Formal Wear'} />
    </View>
  </>
);
const forthRoute = () => (
  <>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={womenAccess} product_name={'Women Acessories'} />
      <ProductTypeCard image={menAccess} product_name={'Men Acessories'} />
    </View>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <ProductTypeCard image={kidsAcess} product_name={'Kids Acessories'} />
      <ProductTypeCard image={kidsShoe} product_name={'Shoes'} />
    </View>
  </>
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: thirdRoute,
  forth: forthRoute,
});

export default function Categories({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Women'},
    {key: 'second', title: 'Men'},
    {key: 'third', title: 'Kids'},
    {key: 'forth', title: 'Acessories'},

    // { key: "forth", title: "Accessories" },
  ]);

  return (
    <>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginTop: 25,
          marginBottom: 20,
        }}>
        CATEGORIES
      </Text>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{ width: "98%" }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            labelStyle={styles.tabBarLabel}
            indicatorStyle={styles.tabBarIndicator}
          />
        )}
      />
    </>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#895cd6',
    height: 50,
  },
  tabBarLabel: {
    fontSize: 15,
    fontWeight: '800',
    width: 100,
    marginLeft: 12,
  },
  tabBarIndicator: {
    backgroundColor: '#fff',
    width: 95,
    alignSelf: 'center',
    // Color of the tab indicator
  },
  scene: {
    flex: 1,
  },
});
