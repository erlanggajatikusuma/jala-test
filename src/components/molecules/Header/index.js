import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconArrow } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Header = ({ title, back }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={back}>
        <Image source={IconArrow} style={{ width: 16, height: 16, marginRight: 16 }} />
      </TouchableOpacity>
      <Text family="Lato" size={18} color="white">
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
});
