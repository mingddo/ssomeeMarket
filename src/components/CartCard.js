import React from 'react';
import { View, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

function CartCard({ item, count }) {
  if (item) {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: item.mainImage }} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {item.name} {count}개
          </Text>
          <Text>
            {(item.ssomeePrice + item.shippingPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.015625,
    width: '100%',
    height: windowHeight * 0.15,
    marginVertical: 5,
    elevation: 1,
    backgroundColor: 'white',
  },
  img: {
    width: windowHeight * 0.15,
    height: windowHeight * 0.15,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  price: { fontSize: 15, fontWeight: 'bold' },
});

export default CartCard;
