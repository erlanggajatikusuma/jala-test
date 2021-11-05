import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import { Disease, News, Price } from '../../components';

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
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
