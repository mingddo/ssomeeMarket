import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

function Button({
  text,
  customFontSize,
  paddingHorizon,
  paddingVertical,
  backgroundColor,
  btnWidth,
  btnHeight,
  borderRadius,
  onHandlePress,
  margin,
  disabled,
  customFontColor,
}) {
  return (
    <TouchableOpacity
      onPress={() => onHandlePress()}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.container,
        {
          paddingLeft: paddingHorizon || windowWidth * 0.00859375,
          paddingRight: paddingHorizon || windowWidth * 0.00859375,
          paddingBottom: paddingVertical || windowHeight * 0.014323,
          paddingTop: paddingVertical || windowHeight * 0.014323,
          backgroundColor: disabled ? 'grey' : backgroundColor || '#1D181E',
          width: btnWidth || windowWidth * 0.4,
          height: btnHeight || windowHeight * 0.08,
          borderRadius: borderRadius || 0,
          margin: margin || 0,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: customFontSize || windowWidth * 0.01875,
            color: customFontColor || 'white',
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    elevation: 7,
    zIndex: 10,
  },
  text: {
    color: 'white',
  },
});

export default Button;
