import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Button from './Button.js';

function Footer() {
  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.footer}>
      <Button
        text={'공유'}
        btnWidth={'15%'}
        btnHeight={windowHeight * 0.073}
        customFontSize={windowWidth * 0.036}
        backgroundColor={'white'}
        customFontColor={'black'}
        onHandlePress={() => alert('공유하기!')}
      />
      <Button
        text={'주문하기'}
        btnWidth={'70%'}
        btnHeight={windowHeight * 0.073}
        customFontSize={windowWidth * 0.036}
        onHandlePress={goto}
      />
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  footer: {
    flex: 0.15,
    position: 'relative',
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: windowWidth * 0.015625,
    // paddingVertical: windowHeight * 0.0156,
    width: '100%',
    height: windowHeight * 0.125,
    backgroundColor: 'white',
  },
});

export default Footer;
