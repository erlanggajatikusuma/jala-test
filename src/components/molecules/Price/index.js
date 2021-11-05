import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from '..';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Price = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 14,
            marginBottom: 8,
          }}
        >
          <Text size={18} color="rgba(0, 68, 146, 1)" style={{ fontWeight: '700' }}>
            Harga Terbaru
          </Text>
        </View>
        <Card />
      </ScrollView>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    backgroundColor: Color.WHITE,
    flex: 1,
  },
});
