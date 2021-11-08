import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap } from '../..';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import CardList from '../CardList';

const url = 'https://app.jala.tech/api/posts?per_page=15&page=1&with=creator';

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
    console.log('GET NEWS');
    getNews(url);
  }, []);

  const getNews = (urlLink) => {
    const token =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwY2UyYjZjNzEzNjkyZmVjNDEwMTJjODYwMjRhMzM4M2ZiOGZjNDI0NDU3NzFmMjMwNjIyMDFkOTJlNDZlYzIxNjYwNTk3ZjdlY2I4YzU4In0.eyJhdWQiOiIxIiwianRpIjoiNzBjZTJiNmM3MTM2OTJmZWM0MTAxMmM4NjAyNGEzMzgzZmI4ZmM0MjQ0NTc3MWYyMzA2MjIwMWQ5MmU0NmVjMjE2NjA1OTdmN2VjYjhjNTgiLCJpYXQiOjE2MzU5OTYyNzEsIm5iZiI6MTYzNTk5NjI3MSwiZXhwIjoxNjY3NTMyMjcxLCJzdWIiOiI3NyIsInNjb3BlcyI6W119.F1bxyaeDygJb66xI3gDYBWmoN_JObb4jItMEtGzDFuW2w9dlA_zglk0CbqZ-keBO3a3w75Ui3t5XoE5I2lV3PP0BMZC7fFgx00sicEVrzNFlt2oUzj5n3RgpGFnclJHmnX-ObSBk-1efciBdB0PcrSMjQp4HrhQXVkzN-Xd4debnzohNOX8nhqdf3GLOoQm8Fak6nSGWy0-vsY9J4mLjzNcPtkBA5lfPk9Z_TCzNUSy1iOyE8sZHcYQSGfehcXISOL1Oev_djgyVzzbZ45jW1GDujO4d94xqY2EdDDpPuKd2bMnA9FOgfoRrxvIJ8u1AFvr6A_QBzH1kwJfWems2_jlpF91C2ZYm1LQhf4DAMoaNZhd1SDYJheh_Nx8mgeYgBgqcWv2tD-1u0-ghyTfN950NelZ_IdUxDJ_Z9riLjDrDJ96WEJNp7pxHJfc34IM5Ok4Im1ewZr8VIIGoXY5u01in_af2JWpKfeODACPO7I2xheMX6c7NInDArMBByB31CUi_NvhJtDoYAZLCeNBWsAG3AGNapl5gue2EdYj263QrfadWtDp5scGaW1f1sINLo9e_HZceLplR336MABHy9wwkK2VW0zgmG11boF3RMZkPTvRe8BSXrqzoz1Ud30NI8JUZjJ-GatDlAHSvBYYqpEe1Wn8v-YwXZsduZF-JNl0';
    Axios.get(urlLink, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        const resdata = res.data;
        console.log('SHRIMP NEWS ===> ', resdata);
        setListNews(resdata.data);
        setState({ ...state, links: resdata.links, currentPage: resdata.meta.current_page });
      })
      .catch((err) => {
        console.log('ERR GET NEWS ==> ', err);
      });
  };

  const handleButton = (value) => {
    console.log('BUTTON PREV NEXT ===> ', value);
    if (value === 'next') {
      getNews(state.links.next);
    }
    if (value === 'prev') {
      getNews(state.links.prev);
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
