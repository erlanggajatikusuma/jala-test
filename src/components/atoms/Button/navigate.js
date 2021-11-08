import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Navigate = ({ onPress, currentPage, nav }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {nav.prev !== null && (
          <TouchableOpacity style={styles.button} onPress={() => onPress('prev')}>
            <Text size={16}>Prev</Text>
          </TouchableOpacity>
        )}
        <View style={[styles.button, { width: 35 }]}>
          <Text size={16}>{currentPage}</Text>
        </View>
        {nav.next !== null && (
          <TouchableOpacity style={styles.button} onPress={() => onPress('next')}>
            <Text size={16}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Navigate;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Color.NEUTRAL_GRAY,
    paddingHorizontal: 8,
    height: 35,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
