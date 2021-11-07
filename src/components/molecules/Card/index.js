import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from '../..';
import { IconVerify } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import { formatRupiah } from '../../../utils';

const Card = ({ supplier, verify, avatar, province, regency, price, onPress, size }) => {
  const validation = 0 || null;
  return (
    <View style={styles.container}>
      <View style={[styles.center, { paddingBottom: 8 }]}>
        <View style={styles.center}>
          <Image source={{ uri: `https://app.jala.tech/storage/${avatar}` }} style={styles.image} />
          <View>
            <Text size={12} color={Color.SEMANTIC_DUST} style={{ fontWeight: '400' }}>
              Supplier
            </Text>
            <Text color={Color.NEUTRAL}>{supplier}</Text>
          </View>
        </View>
        {verify ? (
          <View style={styles.verifyWrapper(verify)}>
            <Image source={IconVerify} />
            <Text size={12} color={Color.NEUTRAL} style={{ marginLeft: 3 }}>
              Terverifikasi
            </Text>
          </View>
        ) : (
          <View style={styles.verifyWrapper(verify)}>
            <Text size={12} color={Color.NEUTRAL}>
              belum terverifikasi
            </Text>
          </View>
        )}
      </View>
      {/* MIDDLE */}
      <View>
        <Text size={12}>16 Januari 2021</Text>
        <Text size={12} color={Color.NEUTRAL}>
          {province}
        </Text>
        <Text size={18} style={{ fontWeight: '700' }}>
          {regency}
        </Text>
      </View>
      {/* BOTTOM */}
      <View style={[styles.center, { marginTop: 4 }]}>
        <View>
          <Text size={12} color={Color.SEMANTIC_DUST} style={{ fontWeight: '400' }}>
            size {size}
          </Text>
          <Text size={22} style={{ fontWeight: '900' }}>
            IDR {price === validation ? 'Tidak Tersedia' : `${formatRupiah(price)}`}
          </Text>
        </View>
        <Button text="Lihat Detail" block onPress={onPress} />
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
    marginBottom: 8,
  },
  center: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  image: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: 'gray',
    marginRight: 8,
    resizeMode: 'cover',
  },
  verifyWrapper: (verify) => ({
    flexDirection: verify ? 'row' : 'column',
    backgroundColor: verify ? Color.SEMANTIC : Color.NEUTRAL_GRAY,
    paddingHorizontal: verify ? 4 : 8,
    paddingVertical: 3,
    borderRadius: 27.5,
    padding: 3,
  }),
});
