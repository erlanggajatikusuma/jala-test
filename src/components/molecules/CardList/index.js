import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconShare } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';
import { getDate, handleShare } from '../../../utils';

const CardList = ({ data, url, detail }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={{ uri: `https://app.jala.tech/storage/${data.image}` }} style={styles.img} />
      <View style={styles.cardBody}>
        <TouchableOpacity onPress={() => navigation.navigate(`${detail}`, { data: data })}>
          <Text size={18} color={Color.NEUTRAL} style={{ fontWeight: '900' }}>
            {data.title ? `${data.title}` : `${data.full_name} (${data.short_name})`}
          </Text>
          <Text color={Color.GRAY} numberOfLines={2} style={{ fontWeight: '400', marginTop: 4 }}>
            {data.meta_description}
          </Text>
        </TouchableOpacity>
        <View style={styles.dateWrapper}>
          <Text>{getDate(data.updated_at)}</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => handleShare(`${url}${data.id}`)}>
            <Image source={IconShare} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginVertical: 6,
  },
  cardBody: { paddingHorizontal: 12, marginTop: 8.5, marginBottom: 10 },
  img: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
