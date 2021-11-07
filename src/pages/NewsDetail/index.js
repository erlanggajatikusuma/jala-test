import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, Loading } from '../../components';
import { handleShare } from '../../utils';

const NewsDetail = ({ navigation, route }) => {
  const { data } = route.params;

  useEffect(() => {
    console.log('NEWS PARAM ===> ', data);
  }, []);

  return (
    <>
      <Header
        title="Kabar Udang"
        back={() => navigation.goBack()}
        onPress={() => handleShare(`https://app.jala.tech/web_view/posts/${data.id}`)}
      />
      <View
        style={{
          overflow: 'hidden',
          flex: 1,
          borderRadius: 8,
          marginHorizontal: 16,
          marginTop: 20,
        }}
      >
        <WebView
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          source={{ uri: `https://app.jala.tech/web_view/posts/${data.id}` }}
          style={{ flex: 1 }}
        />
      </View>
    </>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({});
