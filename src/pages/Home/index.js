import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Disease, News, Price } from '../../components';
import Color from '../../styles/Color';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Color.PRIMARY }}
    style={{ backgroundColor: Color.WHITE }}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          color: focused ? Color.PRIMARY : 'rgba(115, 115, 115, 1)',
          margin: 8,
          fontWeight: '700',
          fontFamily: 'Lato',
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const renderScene = SceneMap({
  first: Price,
  second: News,
  third: Disease,
});

const Home = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Harga Udang' },
    { key: 'second', title: 'Kabar Udang' },
    { key: 'third', title: 'Penyakit' },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
