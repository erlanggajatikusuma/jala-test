import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={{ textTransform: 'uppercase' }} color={Color.WHITE}>
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
