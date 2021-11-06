import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card } from '..';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import Axios from 'axios';
import { IconBiomass, IconPinpoint } from '../../../assets';
import { sizes } from '../../../utils';
import { Gap } from '../..';
import { useNavigation } from '@react-navigation/core';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const Price = () => {
  const [priceList, setPriceList] = useState([]);
  const [size, setSize] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState(
    'https://app.jala.tech/api/shrimp_prices?per_page=15&page=1&with=region,creator&region_id=',
  );

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get(url)
      .then((res) => {
        const resdata = res.data;
        console.log('RES PRICE ===> ', res.data);
        setPriceList(resdata.data);
      })
      .catch((err) => {
        console.log('ERR ===> ', err);
      });
  };

  const pickSize = (val) => {
    setSize(val);
    setModalVisible(!modalVisible);
    const newCopy = [...priceList];
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
              price={item.size_100}
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
        <TouchableOpacity activeOpacity={0.8} style={styles.floatButton(false)}>
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
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.view}
          onPressOut={() => setModalVisible(!modalVisible)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              {/* HEADER */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text size={16} color={Color.NEUTRAL} style={{ fontWeight: '700' }}>
                  Size
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Text color={Color.PRIMARY} style={{ fontWeight: '700' }}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
              {sizes.map((item) => {
                return (
                  <TouchableOpacity key={item} style={styles.button} onPress={() => pickSize(item)}>
                    <Text style={styles.contentTitle}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
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
    height: 190,
    // justifyContent: 'center',
    borderRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    borderBottomWidth: 1,
    borderColor: Color.NEUTRAL_GRAY,
  },
  contentTitle: {
    fontSize: 16,
    marginVertical: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
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
    right: 19,
    left: 19,
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
