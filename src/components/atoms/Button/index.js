import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Button = ({ text, onPress, block = false, fontWeight = '400' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text
        style={{ textTransform: block ? 'uppercase' : 'capitalize', fontWeight: fontWeight }}
        color={Color.WHITE}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Color.PRIMARY,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
