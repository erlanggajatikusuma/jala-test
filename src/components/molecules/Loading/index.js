import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '../../../uikits';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1ABC9C" />
      <Text size={18} style={{ marginTop: 12 }}>
        Loading...
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
