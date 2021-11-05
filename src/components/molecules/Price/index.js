import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '..';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import Axios from 'axios';

const Price = () => {
  const [priceList, setPriceList] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url =
      'https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=';
    Axios.get(url)
      .then((res) => {
        const resdata = res.data.data;
        console.log('RES PRICE ===> ', res.data);
        console.log('RES PRICE ===> ', resdata);
        setPriceList(resdata);
      })
      .catch((err) => {
        console.log('ERR ===> ', err);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 14,
            marginBottom: 8,
          }}
        >
          <Text size={18} color="rgba(0, 68, 146, 1)" style={{ fontWeight: '700' }}>
            Harga Terbaru
          </Text>
        </View>
        {priceList.map((item) => {
          return (
            <Card
              key={item.id}
              supplier={item.creator.name}
              verify={item.creator.buyer}
              avatar={item.creator.avatar}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    backgroundColor: Color.WHITE,
    flex: 1,
  },
});
