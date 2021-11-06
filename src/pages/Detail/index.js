import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Linking, Platform, Alert, Image } from 'react-native';
import { IconVerified } from '../../assets';
import { Button } from '../../components';
import Color from '../../styles/Color';
import { Text } from '../../uikits';
import { sizes } from '../../utils';

const Detail = ({ route }) => {
  const { data } = route.params;
  useEffect(() => {
    console.log('DATA PROPS ===> ', data);
  }, []);

  const callNumber = () => {
    let phone = '+6282225032697';
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        {/* HEAD */}
        <View style={styles.head}>
          <Text size={16} color={Color.NEUTRAL} style={{ fontWeight: '700' }}>
            {data.region.province_name}
          </Text>
          <Text size={16} color="rgba(115, 115, 115, 1)" style={{ fontWeight: '700' }}>
            {data.region.regency_name}
          </Text>
        </View>
        {/* BODY */}
        <View style={styles.body}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>16 Januari 2020</Text>
            {data.creator.buyer ? (
              <View style={styles.verifyWrapper(data.creator.buyer)}>
                <Image source={IconVerified} />
                <Text size={12} color={Color.NEUTRAL} style={{ marginLeft: 3 }}>
                  Terverifikasi
                </Text>
              </View>
            ) : (
              <View style={styles.verifyWrapper(data.creator.buyer)}>
                <Text size={12} color={Color.NEUTRAL}>
                  belum terverifikasi
                </Text>
              </View>
            )}
          </View>
          {/* PROFILE */}
          <View style={styles.center}>
            <Image
              source={{ uri: `https://app.jala.tech/storage/${data.creator.avatar}` }}
              style={styles.image}
            />
            <View>
              <Text size={12} color={Color.SEMANTIC_DUST} style={{ fontWeight: '400' }}>
                Supplier
              </Text>
              <Text color={Color.NEUTRAL}>{data.creator.name}</Text>
            </View>
          </View>
          {/* CP */}
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View>
              <Text size={12} color="rgba(160, 158, 158, 1)" style={{ fontWeight: '400' }}>
                Kontak
              </Text>
              <Text size={16} color={Color.NEUTRAL} style={{ fontWeight: '700' }}>
                {data.creator.phone}
              </Text>
            </View>
            <Button text="Hubungi" fontWeight="700" onPress={callNumber} />
          </View>
          {/* PRICE LIST */}
          <View>
            <Text size={16} color="rgba(54, 54, 55, 1)" style={{ fontWeight: '700' }}>
              Daftar Harga
            </Text>
            {sizes.map((item) => (
              <View key={item} style={{ flexDirection: 'row' }}>
                <Text style={{ width: 80, marginRight: 8 }}>Size {item}</Text>
                <Text>{data[`size_${item}`]}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  head: {
    backgroundColor: Color.WHITE,
    padding: 12,
    marginBottom: 4,
  },
  body: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  verifyWrapper: (verify) => ({
    flexDirection: verify ? 'row' : 'column',
    backgroundColor: verify ? Color.SEMANTIC : Color.NEUTRAL_GRAY,
    paddingHorizontal: verify ? 4 : 8,
    paddingVertical: 3,
    borderRadius: 27.5,
    padding: 3,
  }),
  center: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  image: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: 'gray',
    marginRight: 8,
    resizeMode: 'cover',
  },
});
