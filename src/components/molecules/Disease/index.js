import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../../uikits';
import Axios from 'axios';
import { token } from '../../../utils';

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
    <View>
      <Text size={14}>Penyakit</Text>
    </View>
  );
};

export default Disease;

const styles = StyleSheet.create({});
