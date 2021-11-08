import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap } from '../..';
import { API_HOST, getData } from '../../../api';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import CardList from '../CardList';

const News = () => {
  const [state, setState] = useState({
    links: {
      first: '',
      last: '',
      next: '',
      prev: null,
    },
    currentPage: 1,
  });
  const [listNews, setListNews] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    getData(API_HOST.news, true)
      .then((res) => {
        const resdata = res.data;
        console.log('PROMISE GET SHRIMP NEWS ===> ', resdata);
        setListNews(resdata.data);
        setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
      })
      .catch((err) => {
        console.log('ERR GET NEWS ===> ', err);
      });
  }, []);

  const handleButton = (value) => {
    console.log('BUTTON PREV NEXT ===> ', value);
    if (value === 'next') {
      getData(state.links.next, true)
        .then((res) => {
          const resdata = res.data;
          console.log('PROMISE GET SHRIMP NEWS ===> ', resdata);
          setListNews(resdata.data);
          setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
        })
        .catch((err) => {
          console.log('ERR GET NEWS ===> ', err);
        });
    }
    if (value === 'prev') {
      getData(state.links.prev, true)
        .then((res) => {
          const resdata = res.data;
          console.log('PROMISE GET SHRIMP NEWS ===> ', resdata);
          setListNews(resdata.data);
          setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
        })
        .catch((err) => {
          console.log('ERR GET NEWS ===> ', err);
        });
    }
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text size={18} color="rgba(0, 68, 146, 1)" style={{ fontWeight: '700' }}>
          Kabar Terbaru
        </Text>
      </View>
      <ScrollView ref={scrollRef}>
        {listNews.map((news) => (
          <CardList
            key={news.id}
            data={news}
            url="https://app.jala.tech/posts/"
            detail="NewsDetail"
          />
        ))}

        <Gap height={50} />
        <Button
          type="navigation"
          nav={{ prev: state.links.prev, next: state.links.next }}
          text={state.currentPage}
          onPress={(val) => handleButton(val)}
        />
        <Gap height={50} />
      </ScrollView>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  page: {
    backgroundColor: Color.WHITE,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 14,
    marginBottom: 8,
  },
});
