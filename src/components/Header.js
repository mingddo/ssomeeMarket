import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

function Header({ text }) {
  const navigation = useNavigation();
  const [isRoot, setisRoot] = useState(false);
  const route = useRoute();
  useEffect(() => {
    if (route.name === 'ProductList') {
      setisRoot(true);
    } else {
      setisRoot(false);
    }
  }, []);
  return (
    <View style={styles.header}>
      {!isRoot && (
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.Back}>
          ◀
        </Text>
      )}
      <Text style={styles.logoText}>{text}</Text>
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  header: {
    // flex: 0.1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.015625,
    width: '100%',
    height: windowHeight * 0.055625,
    backgroundColor: '#6331EF',
  },
  logoText: {
    fontSize: windowWidth * 0.036,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  Back: {
    position: 'absolute',
    left: windowWidth * 0.02,
    fontSize: windowWidth * 0.036,
    color: 'white',
    zIndex: 50,
  },
});

export default Header;
