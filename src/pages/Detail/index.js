import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../../styles/Color';
import { Text } from '../../uikits';

const Detail = ({ route }) => {
  const { data } = route.params;
  useEffect(() => {
    console.log('DATA PROPS ===> ', data);
  }, []);

  return (
    <View style={styles.page}>
      <Text>Detail Page</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    color: Color.WHITE,
    flex: 1,
  },
});
