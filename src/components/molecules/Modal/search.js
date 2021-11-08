import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IconDel, IconSearch } from '../../../assets';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const Search = ({
  close,
  show,
  data,
  picked,
  endScroll,
  value,
  onChangeText,
  onPress,
  onSubmitEditing,
}) => {
  return (
    <Modal animationType={'fade'} transparent={true} visible={show} statusBarTranslucent={true}>
      <TouchableOpacity activeOpacity={1} style={styles.view} onPressOut={close}>
        <TouchableWithoutFeedback>
          <View style={[styles.content, { height: 464 }]}>
            {/* HEADER */}
            <View style={styles.header}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}
              >
                <Text size={16} color={Color.NEUTRAL} style={{ fontWeight: '700' }}>
                  Kota/Kabupaten
                </Text>
                <TouchableOpacity onPress={close}>
                  <Text color={Color.PRIMARY} style={{ fontWeight: '700' }}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
              {/* INPUT */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={IconSearch} style={styles.imgSearch} />
                <TextInput
                  value={value}
                  onChangeText={onChangeText}
                  style={styles.input}
                  placeholder="Cari"
                  placeholderTextColor="rgba(160, 158, 158, 1)"
                  onSubmitEditing={onSubmitEditing}
                />
                <TouchableOpacity onPress={onPress}>
                  <Image source={IconDel} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={{ paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  endScroll('endScroll from modal');
                }
              }}
              scrollEventThrottle={400}
            >
              {data.map((item) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => picked(item)}>
                    {/* <Text style={styles.contentTitle}>{item.region.full_name}</Text> */}
                    <Text style={styles.contentTitle}>{item.full_name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default Search;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  content: {
    backgroundColor: Color.WHITE,
    paddingTop: 20,
    borderRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Color.NEUTRAL_GRAY,
  },
  contentTitle: {
    fontSize: 16,
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.NEUTRAL_GRAY,
    paddingVertical: 6,
    paddingLeft: 35,
    paddingRight: 11,
    color: '#000',
    backgroundColor: 'rgba(245, 246, 247, 1)',
    position: 'relative',
    flex: 1,
    marginRight: 12,
  },
  imgSearch: {
    width: 17.5,
    height: 17.5,
    position: 'absolute',
    zIndex: 1,
    top: 12,
    left: 11,
  },
});
