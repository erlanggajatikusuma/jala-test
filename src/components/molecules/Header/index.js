import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconArrow } from '../../../assets';
import { Text } from '../../../uikits';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image source={IconArrow} style={{ width: 16, height: 16, marginRight: 16 }} />
      </TouchableOpacity>
      <Text family="Lato" size={18} color="white">
        Jala Media
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(27, 119, 223, 1)',
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
