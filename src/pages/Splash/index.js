import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../../styles/Color';
import { Text } from '../../uikits';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <Text size={18} color={Color.WHITE} style={{ fontWeight: '700' }}>
        JALA
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.PRIMARY,
  },
});
