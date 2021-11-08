import { useNavigation } from '@react-navigation/core';
import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { Card } from '..';
import { Button, Gap } from '../..';
import { API_HOST, getData } from '../../../api';
import { IconBiomass, IconPinpoint } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import Modal from '../Modal';

const Price = () => {
  const [state, setState] = useState({
    links: {
      first: '',
      last: '',
      next: '',
      prev: null,
    },
    link: {},
    currentPage: 1,
    region: 'Indonesia',
  });
  const [priceList, setPriceList] = useState([]);
  const [size, setSize] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [listRegion, setListRegion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const scrollRef = useRef();

  useEffect(() => {
    getData(API_HOST.prices)
      .then((res) => {
        console.log('PROMISE RES PRICES ==> ', res.data);
        const resdata = res.data;
        setPriceList(resdata.data);
        setListRegion(resdata.data);
        setState({
          ...state,
          links: resdata.links,
          link: resdata.links,
          currentPage: resdata.meta.current_page,
        });
      })
      .catch((err) => {
        console.log('ERR GET PRICES ===> ', err);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData(API_HOST.prices)
      .then((res) => {
        console.log('PROMISE RES PRICES ==> ', res.data);
        const resdata = res.data;
        setPriceList(resdata.data);
        setListRegion(resdata.data);
        setState({
          ...state,
          links: resdata.links,
          link: resdata.links,
          currentPage: resdata.meta.current_page,
          region: 'Indonesia',
        });
        setRefreshing(false);
      })
      .catch((err) => {
        console.log('ERR GET PRICES ===> ', err);
        setRefreshing(false);
      });
  }, []);

  const pickSize = (value) => {
    setSize(value);
    setModalVisible(!modalVisible);
  };

  const onFilterRegion = (value) => {
    const urlId = `${API_HOST.prices}${value.region.id}`;
    console.log('REGION ===> ', value);
    Axios.get(urlId)
      .then((res) => {
        const resdata = res.data;
        console.log('FILTER REGION ===> ', res.data);
        setPriceList(resdata.data);
        setState({
          ...state,
          links: resdata.links,
          currentPage: resdata.meta.current_page,
          region: value.region.name,
        });
        setModalSearch(!modalSearch);
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      })
      .catch((err) => {
        console.log('ERR ===> ', err);
      });
  };

  const handleDetail = (value) => {
    navigation.navigate('Detail', { data: value });
  };

  const handleButton = (value) => {
    console.log('BUTTON PREV NEXT ===> ', value);
    if (value === 'next') {
      getData(state.links.next)
        .then((res) => {
          const resdata = res.data;
          setPriceList(resdata.data);
          setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
        })
        .catch((err) => console.log('ERR GET PRICES ===> ', err));
    }
    if (value === 'prev') {
      getData(state.links.prev)
        .then((res) => {
          const resdata = res.data;
          setPriceList(resdata.data);
          setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
        })
        .catch((err) => console.log('ERR GET PRICES ===> ', err));
    }
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const onEndScroll = (value) => {
    getData(state.link.next)
      .then((res) => {
        console.log('END SCROLL ==> ', res.data);
        const resdata = res.data;
        setState({ ...state, link: resdata.links });
        const newCopy = [...listRegion];
        resdata.data.map((data) => {
          newCopy.push(data);
        });
        setListRegion(newCopy);
      })
      .catch((err) => {
        console.log('ERR GET PRICES ===> ', err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size={18} color="rgba(0, 68, 146, 1)" style={{ fontWeight: '700' }}>
          Harga Terbaru
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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

        {/* Button Navigation */}
        <Gap height={20} />
        <Button
          type="navigation"
          nav={{ prev: state.links.prev, next: state.links.next }}
          text={state.currentPage}
          onPress={(val) => handleButton(val)}
        />
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
              {state.region}
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
        data={listRegion}
        endScroll={(val) => onEndScroll(val)}
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
