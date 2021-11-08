import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, Loading } from '../../components';
import { handleShare } from '../../utils';

const DiseaseDetail = ({ navigation, route }) => {
  const { data } = route.params;

  useEffect(() => {
    console.log('DISEASE PARAMS ====> ', data);
  }, []);
  return (
    <>
      <Header
        title="Info Penyakit"
        back={() => navigation.goBack()}
        onPress={() => handleShare(`https://app.jala.tech/web_view/diseases/${data.id}`)}
      />
      <View
        style={{
          overflow: 'hidden',
          flex: 1,
          borderRadius: 6,
          marginHorizontal: 16,
          marginTop: 20,
        }}
      >
        <WebView
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          source={{ uri: `https://app.jala.tech/web_view/diseases/${data.id}` }}
          style={{ flex: 1 }}
        />
      </View>
    </>
  );
};

export default DiseaseDetail;

const styles = StyleSheet.create({});
