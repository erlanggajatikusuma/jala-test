import { useNavigation } from '@react-navigation/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconShare } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import { handleShare } from '../../../utils';

const News = () => {
  const [listNews, setListNews] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('GET NEWS');
    getNews();
  }, []);

  const getNews = () => {
    const url = 'https://app.jala.tech/api/posts?per_page=15&page=1&with=creator';
    const token =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcwY2UyYjZjNzEzNjkyZmVjNDEwMTJjODYwMjRhMzM4M2ZiOGZjNDI0NDU3NzFmMjMwNjIyMDFkOTJlNDZlYzIxNjYwNTk3ZjdlY2I4YzU4In0.eyJhdWQiOiIxIiwianRpIjoiNzBjZTJiNmM3MTM2OTJmZWM0MTAxMmM4NjAyNGEzMzgzZmI4ZmM0MjQ0NTc3MWYyMzA2MjIwMWQ5MmU0NmVjMjE2NjA1OTdmN2VjYjhjNTgiLCJpYXQiOjE2MzU5OTYyNzEsIm5iZiI6MTYzNTk5NjI3MSwiZXhwIjoxNjY3NTMyMjcxLCJzdWIiOiI3NyIsInNjb3BlcyI6W119.F1bxyaeDygJb66xI3gDYBWmoN_JObb4jItMEtGzDFuW2w9dlA_zglk0CbqZ-keBO3a3w75Ui3t5XoE5I2lV3PP0BMZC7fFgx00sicEVrzNFlt2oUzj5n3RgpGFnclJHmnX-ObSBk-1efciBdB0PcrSMjQp4HrhQXVkzN-Xd4debnzohNOX8nhqdf3GLOoQm8Fak6nSGWy0-vsY9J4mLjzNcPtkBA5lfPk9Z_TCzNUSy1iOyE8sZHcYQSGfehcXISOL1Oev_djgyVzzbZ45jW1GDujO4d94xqY2EdDDpPuKd2bMnA9FOgfoRrxvIJ8u1AFvr6A_QBzH1kwJfWems2_jlpF91C2ZYm1LQhf4DAMoaNZhd1SDYJheh_Nx8mgeYgBgqcWv2tD-1u0-ghyTfN950NelZ_IdUxDJ_Z9riLjDrDJ96WEJNp7pxHJfc34IM5Ok4Im1ewZr8VIIGoXY5u01in_af2JWpKfeODACPO7I2xheMX6c7NInDArMBByB31CUi_NvhJtDoYAZLCeNBWsAG3AGNapl5gue2EdYj263QrfadWtDp5scGaW1f1sINLo9e_HZceLplR336MABHy9wwkK2VW0zgmG11boF3RMZkPTvRe8BSXrqzoz1Ud30NI8JUZjJ-GatDlAHSvBYYqpEe1Wn8v-YwXZsduZF-JNl0';
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        const resdata = res.data;
        console.log('SHRIMP NEWS ===> ', resdata);
        setListNews(resdata.data);
      })
      .catch((err) => {
        console.log('ERR GET NEWS ==> ', err);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        {listNews.map((news) => (
          <View key={news.id} style={styles.card}>
            <Image
              source={{ uri: `https://app.jala.tech/storage/${news.image}` }}
              style={styles.img}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('NewsDetail', { data: news })}
              style={styles.cardBody}
            >
              <Text size={18} color={Color.NEUTRAL} style={{ fontWeight: '900' }}>
                {news.title}
              </Text>
              <Text
                color={Color.GRAY}
                numberOfLines={2}
                style={{ fontWeight: '400', marginTop: 4 }}
              >
                {news.meta_description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text>{news.updated_at}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleShare(`https://app.jala.tech/posts/${news.id}`)}
                >
                  <Image source={IconShare} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginVertical: 6,
  },
  cardBody: { paddingHorizontal: 12, marginTop: 8.5, marginBottom: 10 },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: 160,
  },
});
