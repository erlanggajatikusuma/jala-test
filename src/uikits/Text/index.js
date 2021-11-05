import React from 'react';
import { Text as TextNative } from 'react-native';
import styles from './styles';

const getFontFamily = (family) => {
  switch (family) {
    case 'LatoBlack':
      return styles.LatoBlack;
    case 'LatoBold':
      return styles.LatoBold;
    case 'LatoLight':
      return styles.LatoLight;
    case 'LatoThin':
      return styles.LatoThin;
    case 'Lato':
      return styles.Lato;
    default:
      return styles.Lato;
  }
};

const Text = (props) => {
  const {
    testID,
    children = '',
    style = null,
    color = 'black',
    family = 'Lato',
    size = 14,
    decoration = 'none',
    numberOfLines,
    ...rest
  } = props;
  const font = getFontFamily(family);
  return (
    <TextNative
      testID={testID}
      numberOfLines={numberOfLines}
      {...rest}
      style={[
        font,
        {
          color,
          fontSize: size && size,
          textDecorationLine: decoration,
        },
        style,
      ]}
    >
      {children}
    </TextNative>
  );
};

export default React.memo(Text);
