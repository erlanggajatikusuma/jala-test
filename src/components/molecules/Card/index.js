import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from '../..';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Card = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{
              width: 32,
              height: 32,
              borderRadius: 32 / 2,
              backgroundColor: 'gray',
              marginRight: 8,
            }}
          />
          <View>
            <Text size={12} color={Color.SEMANTIC_DUST} style={{ fontWeight: '400' }}>
              Supplier
            </Text>
            <Text color={Color.NEUTRAL}>Mina Udang Berkah</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Color.SEMANTIC,
            borderRadius: 27.5,
            padding: 3,
          }}
        >
          <Image />
          <Text size={12} color={Color.NEUTRAL}>
            Terverifikasi
          </Text>
        </View>
      </View>
      {/* MIDDLE */}
      <View>
        <Text size={12}>16 Januari 2021</Text>
        <Text size={12} color={Color.NEUTRAL}>
          Nusa Tenggara Barat
        </Text>
        <Text size={18} style={{ fontWeight: '700' }}>
          Sumba
        </Text>
      </View>
      {/* BOTTOM */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <View>
          <Text size={12} color={Color.SEMANTIC_DUST} style={{ fontWeight: '400' }}>
            size 100
          </Text>
          <Text size={22} style={{ fontWeight: '900' }}>
            IDR 56.500
          </Text>
        </View>
        <Button text="Lihat Detail" />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(229, 229, 229, 1)',
    padding: 12,
    borderRadius: 4,
    backgroundColor: Color.WHITE,
  },
});