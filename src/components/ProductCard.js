import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

function ProductCard({ product, onHandleSelect }) {
  const navigation = useNavigation();

  if (product.name) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.card}
        onPress={() => onHandleSelect(product.prefix)}>
        <Image
          style={styles.img}
          source={{
            uri: product.mainImage,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.brandname}>{product.brand.name}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>
              {product.ssomeePrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text style={styles.discount}>
              {(
                ((product.originalPrice - product.ssomeePrice) /
                  product.originalPrice) *
                100
              ).toFixed(2)}
              %
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: windowWidth * 0.015625,
    marginVertical: windowHeight * 0.0156,
    width: '45%',
    height: windowHeight * 0.35,
    // backgroundColor: 'red',
  },
  img: {
    width: '100%',
    height: windowHeight * 0.24,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  info: {
    width: '100%',
    height: '35%',
    paddingHorizontal: windowWidth * 0.015,
    paddingVertical: windowWidth * 0.015,
  },
  brandname: { fontSize: 10, fontWeight: 'bold' },
  name: { fontSize: 10 },
  priceWrapper: {
    flexDirection: 'row',
    marginTop: 5,
  },
  price: { marginRight: 5, fontSize: 14, fontWeight: 'bold' },
  discount: { color: '#6331EF', fontWeight: 'bold' },
});

export default ProductCard;
