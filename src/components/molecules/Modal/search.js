import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Color from '../../../styles/Color';
import { Text } from '../../../uikits';

const Search = ({ close, show, data, picked }) => {
  return (
    <Modal animationType={'fade'} transparent={true} visible={show} statusBarTranslucent={true}>
      <TouchableOpacity activeOpacity={1} style={styles.view} onPressOut={close}>
        <TouchableWithoutFeedback>
          <View style={[styles.content, { height: 464 }]}>
            {/* HEADER */}
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 16,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: Color.NEUTRAL_GRAY,
              }}
            >
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
              <View>
                <TextInput
                  placeholder="Cari"
                  placeholderTextColor="rgba(160, 158, 158, 1)"
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: Color.NEUTRAL_GRAY,
                    paddingVertical: 6,
                    paddingHorizontal: 11,
                    color: '#000',
                    backgroundColor: 'rgba(245, 246, 247, 1)',
                  }}
                />
              </View>
            </View>
            <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
              {data.map((item) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => picked(item)}>
                    <Text style={styles.contentTitle}>{item.region.full_name}</Text>
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
    // paddingHorizontal: 16,
    paddingTop: 20,
    borderRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 16,
    marginVertical: 12,
  },
});
