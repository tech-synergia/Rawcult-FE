import * as React from 'react';
import {
  SafeAreaView,
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ProductTypeCard from '../components/ProductTypeCard';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
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
    <View style={{marginBottom: 80}}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('womenTop')}>
          <ProductTypeCard
            backgroundColor={'#dabce3'}
            image={womenTop}
            product_name={'Top Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('womenBottom')}>
          <ProductTypeCard
            backgroundColor={'#b595bf'}
            image={womenBottom}
            product_name={'Bottom Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('womenCasual')}>
          <ProductTypeCard
            backgroundColor={'#b595bf'}
            image={womenCasual}
            product_name={'Casual Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('womenFormal')}>
          <ProductTypeCard
            backgroundColor={'#b595bf'}
            image={womenFormal}
            product_name={'Formal Wear'}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 80}}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('menTop')}>
          <ProductTypeCard
            backgroundColor={'#9dace0'}
            image={menTop}
            product_name={'Top Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('menBottom')}>
          <ProductTypeCard
            backgroundColor={'#9dace0'}
            image={menBottom}
            product_name={'Bottom Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('menCasual')}>
          <ProductTypeCard
            backgroundColor={'#9dace0'}
            image={menCasual}
            product_name={'Casual Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('menFormal')}>
          <ProductTypeCard
            backgroundColor={'#9dace0'}
            image={menFormal}
            product_name={'Formal Wear'}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const thirdRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 80}}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('kidsTop')}>
          <ProductTypeCard
            backgroundColor={'#c3dfe3'}
            image={kidsTop}
            product_name={'Top Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kidsBottom')}>
          <ProductTypeCard
            backgroundColor={'#c3dfe3'}
            image={kidsBottom}
            product_name={'Bottom Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kidsCasual')}>
          <ProductTypeCard
            backgroundColor={'#c3dfe3'}
            image={kidsCasual}
            product_name={'Casual Wear'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kidsFormal')}>
          <ProductTypeCard
            backgroundColor={'#c3dfe3'}
            image={kidsFormal}
            product_name={'Formal Wear'}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const forthRoute = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 80}}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('womenAcess')}>
          <ProductTypeCard
            backgroundColor={'#d6d6bc'}
            image={womenAccess}
            product_name={'Women Acessories'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('menAcess')}>
          <ProductTypeCard
            backgroundColor={'#d6d6bc'}
            image={menAccess}
            product_name={'Men Acessories'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('kidsAcess')}>
          <ProductTypeCard
            backgroundColor={'#d6d6bc'}
            image={kidsAcess}
            product_name={'Kids Acessories'}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: thirdRoute,
  forth: forthRoute,
});

export default function Categories({navigation}) {
  const layout = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState('');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Women', value: 'womens wear'},
    {key: 'second', title: 'Men', value: 'mens wear'},
    {key: 'third', title: 'Kids', value: 'kids wear'},
    {key: 'forth', title: 'Acessories', value: 'accessories wear'},

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
          <>
            <TabBar
              {...props}
              style={styles.tabBar}
              labelStyle={styles.tabBarLabel}
              indicatorStyle={styles.tabBarIndicator}
            />
          </>
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
