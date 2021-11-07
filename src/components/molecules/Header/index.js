import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconArrow, IconShare } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Header = ({ title, back, share = true, onPress }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={back}>
          <Image source={IconArrow} style={{ width: 16, height: 16, marginRight: 16 }} />
        </TouchableOpacity>
        <Text family="Lato" size={18} color={Color.WHITE} style={{ fontWeight: '700' }}>
          {title}
        </Text>
      </View>
      {share && (
        <TouchableOpacity onPress={onPress}>
          <Image source={IconShare} style={{ tintColor: Color.WHITE }} />
        </TouchableOpacity>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
});
