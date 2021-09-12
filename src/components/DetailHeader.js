import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

function DetailHedaer({ product }) {
  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate('Cart');
  };
  if (product) {
    return (
      <View style={styles.container}>
        <Text style={styles.category}>{product.category.name}</Text>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.price}>
            {product.ssomeePrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </Text>
          <Text style={styles.discount}>
            {(
              ((product.originalPrice - product.ssomeePrice) /
                product.originalPrice) *
              100
            ).toFixed(2)}
            %
          </Text>
          <Text style={styles.discountSomi}>소미할인</Text>
        </View>
        <Text style={styles.originalPrice}>{product.originalPrice}</Text>
        <View style={styles.section1}>
          <View style={styles.textSmallContainer}>
            <Text style={styles.textSmall}>포인트</Text>
            <Text
              style={[
                styles.textSmall,
                { color: '#6331EF', fontWeight: 'bold' },
              ]}>
              {(product.ssomeePrice + product.shippingPrice) * 0.01}원 적립
              예정(1%)
            </Text>
          </View>
          <View style={styles.textSmallContainer}>
            <Text style={styles.textSmall}>배송비</Text>
            <Text style={styles.textSmall}>
              {product.shippingPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </Text>
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.dividedPrice}>
          <Text style={styles.dividedPriceTitle}>분할 결제</Text>
          <View style={styles.textSmallContainer}>
            <Text style={styles.textSmall}>오늘 결제 금액</Text>
            <Text
              style={[
                styles.textSmall,
                { color: 'black', fontWeight: 'bold' },
              ]}>
              {product.charges[0]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </Text>
          </View>
          <View style={styles.textSmallContainer}>
            <Text style={styles.textSmall}>최대 30일 후 결제 금액</Text>
            <Text
              style={[
                styles.textSmall,
                { color: 'black', fontWeight: 'bold' },
              ]}>
              {product.charges[1]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </Text>
          </View>
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
    width: '100%',
  },
  category: {
    fontSize: 10,
    color: 'grey',
    // marginBottom: height * 0.02,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: windowHeight * 0.02,
  },
  price: { marginRight: 5, fontSize: 16, fontWeight: 'bold' },
  discount: { color: '#6331EF', fontSize: 16, fontWeight: 'bold' },
  discountSomi: { color: '#6331EF', fontSize: 10, paddingHorizontal: 3 },
  originalPrice: {
    color: '#a5a5a5',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  textSmallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: windowHeight * 0.005,
  },
  textSmall: { color: '#a5a5a5', fontSize: 10 },
  section1: {
    marginVertical: windowHeight * 0.03,
  },
  hr: {
    width: '95%',
    height: 2,
    backgroundColor: '#cecece',
    borderWidth: 0,
    elevation: 0,
    alignSelf: 'center',
  },
  dividedPrice: {
    marginVertical: windowHeight * 0.03,
  },
  dividedPriceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});

export default DetailHedaer;
