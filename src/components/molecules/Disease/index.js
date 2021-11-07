import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../../../uikits';
import Axios from 'axios';
import { token } from '../../../utils';
import CardList from '../CardList';
import Color from '../../../styles/Color';

const Disease = () => {
  const [url, setUrl] = useState('https://app.jala.tech/api/diseases?per_page=15&page=1');
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        const resdata = res.data;
        console.log('SHRIMP DISEASES ===> ', resdata);
        setDiseases(resdata.data);
      })
      .catch((err) => {
        console.log('ERR GET DISEASES ==> ', err);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text size={18} color="rgba(0, 68, 146, 1)" style={{ fontWeight: '700' }}>
          Daftar Penyakit
        </Text>
      </View>
      <ScrollView>
        {diseases.map((disease) => {
          return (
            <CardList
              key={disease.id}
              data={disease}
              url={'https://app.jala.tech/web_view/diseases/'}
              detail="DiseaseDetail"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Disease;

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
