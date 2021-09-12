import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  getCategories,
  getProductsList,
  getProductsPrefix,
  orderProducts,
} from '../api/api.js';
import {
  getCategoryAction,
  getProductsAction,
  selectProductsAction,
} from '../store/actions/dataActions';
import useData from '../hooks/useData';
//Components
import Header from '../components/Header.js';
import ProductCard from '../components/ProductCard.js';
import { cli } from 'webpack';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ProductList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categorys, products } = useData();

  useEffect(() => {
    getCategories(
      (res) => {
        dispatch(getCategoryAction(res.data));
      },
      (err) => {
        console.error(err);
      },
    );
    getProductsList(
      11,
      1,
      'price-asc',
      (res) => {
        dispatch(getProductsAction(res.data.products));
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);

  const onHandleSelect = (target) => {
    console.log('target :>> ', target);
    dispatch(selectProductsAction(target));
    navigation.navigate('ProductDetail');
  };

  return (
    <View style={styles.container}>
      <Header text={'소미마켓'} />
      <ScrollView style={styles.wraper}>
        <View style={styles.itempwaper}>
          {products.length !== 0 &&
            products.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                onHandleSelect={onHandleSelect}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wraper: {
    // flex: 1,
    width: '100%',
  },
  itempwaper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
