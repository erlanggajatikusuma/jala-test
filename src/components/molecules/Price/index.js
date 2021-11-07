import { useNavigation } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Card } from '..';
import { Gap } from '../..';
import { IconBiomass, IconPinpoint } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import Modal from '../Modal';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const Price = () => {
  const [priceList, setPriceList] = useState([]);
  const [size, setSize] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [url, setUrl] = useState(
    'https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=',
  );

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    getData();
    console.log('HEIGHT ===> ', height);
    console.log('HEADER HEIGHT ===> ', headerHeight);
    console.log('STATUS BAR HEIGHT ===> ', StatusBar.currentHeight);
    console.log('MODAL HEIGHT ===> ', height - (headerHeight + StatusBar.currentHeight));
  }, []);

  const getData = () => {
    Axios.get(url)
      .then((res) => {
        const resdata = res.data;
        console.log('RES PRICE ===> ', res.data);
        setPriceList(resdata.data);
        // resdata.data.map((item) => {
        //   console.log('REGION ===> ', item.region.full_name);
        // });
      })
      .catch((err) => {
        console.log('ERR ===> ', err);
      });
  };

  const pickSize = (value) => {
    setSize(value);
    setModalVisible(!modalVisible);
  };

  const onFilterRegion = (value) => {
    const urlId = `https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=${value.region.id}`;
    console.log('REGION ===> ', urlId);
    console.log('REGION ===> ', value);
    Axios.get(urlId)
      .then((res) => {
        const resdata = res.data;
        console.log('RES REGION ===> ', res.data);
      })
      .catch((err) => {
        console.log('ERR ===> ', err);
      });
  };

  const onEndScroll = () => {
    console.log('END SCROLLL');
  };

  const handleDetail = (value) => {
    navigation.navigate('Detail', { data: value });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onEndScroll();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={styles.title}>
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
              province={item.region.province_name}
              regency={item.region.regency_name}
              price={item[`size_${size}`]}
              size={size}
              onPress={() => handleDetail(item)}
            />
          );
        })}

        <Gap height={100} />
      </ScrollView>
      {/* FLOAT BUTTON */}
      <View style={styles.floatWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.floatButton(true)}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image source={IconBiomass} style={{ width: 24, height: 24, marginRight: 12 }} />
          <View>
            <Text size={12} color={Color.WHITE}>
              Size
            </Text>
            <Text color={Color.WHITE} style={{ fontWeight: '700' }}>
              {size}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalSearch(!modalSearch)}
          activeOpacity={0.8}
          style={styles.floatButton(false)}
        >
          <Image source={IconPinpoint} style={{ width: 24, height: 24, marginRight: 12 }} />
          <View>
            <Text size={16} color={Color.WHITE} style={{ fontWeight: '700' }}>
              Indonesia
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        show={modalVisible}
        close={() => setModalVisible(!modalVisible)}
        picked={(val) => pickSize(val)}
      />
      <Modal
        type="search"
        show={modalSearch}
        close={() => setModalSearch(!modalSearch)}
        picked={(val) => onFilterRegion(val)}
        data={priceList}
      />
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  content: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 16,
    marginVertical: 10,
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 19,
    backgroundColor: Color.WHITE,
    flex: 1,
    position: 'relative',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  floatWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 12,
    left: 12,
    marginBottom: 8,
  },
  floatButton: (size) => ({
    backgroundColor: size ? Color.PRIMARY_DARK : Color.PRIMARY,
    borderTopLeftRadius: size ? 60 : 0,
    borderBottomLeftRadius: size ? 60 : 0,
    borderTopRightRadius: size ? 0 : 60,
    borderBottomRightRadius: size ? 0 : 60,
    flexDirection: 'row',
    paddingLeft: 22,
    alignItems: 'center',
    paddingVertical: 4,
    flex: size ? 1 : 2,
  }),
});
