import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal as ModalNative,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import Color from '../../../styles/Color';
import { sizes } from '../../../utils';
import { useHeaderHeight } from '@react-navigation/elements';

const Modal = ({ show, setSize, close }) => {
  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  return (
    <ModalNative
      animationType={'fade'}
      transparent={true}
      visible={show}
      statusBarTranslucent={true}
    >
      <TouchableOpacity activeOpacity={1} style={styles.view} onPressOut={close}>
        <TouchableWithoutFeedback>
          <View
            style={[styles.content, { height: height - (headerHeight + StatusBar.currentHeight) }]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* HEADER */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text size={16} color={Color.NEUTRAL} style={{ fontWeight: '700' }}>
                  Size
                </Text>
                <TouchableOpacity onPress={close}>
                  <Text color={Color.PRIMARY} style={{ fontWeight: '700' }}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
              {sizes.map((item) => {
                return (
                  //   <TouchableOpacity key={item} onPress={() => pickSize(item)}>
                  <TouchableOpacity key={item} onPress={() => setSize(item)}>
                    <Text style={styles.contentTitle}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </ModalNative>
  );
};

export default Modal;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  content: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 16,
    marginVertical: 10,
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
});
