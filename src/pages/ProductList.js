import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
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

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ProductList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categorys, products } = useData();
  const [maxPage, setMaxPage] = useState(null);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    getCategories(
      (res) => {
        dispatch(getCategoryAction(res.data));
      },
      (err) => {
        console.error(err);
      },
    );
    getProductsData();
  }, []);

  const getProductsData = () => {
    if (pageNum !== maxPage) {
      getProductsList(
        'all',
        pageNum + 1,
        'price-asc',
        (res) => {
          if (pageNum === 0) {
            setMaxPage(res.data.maxPage);
          }
          dispatch(getProductsAction(res.data.products));
        },
        (err) => {
          console.error(err);
        },
      );
      if (pageNum !== maxPage) {
        setPageNum(pageNum + 1);
      }
    }
  };

  const renderItem = ({ item }) => {
    if (item) {
      return <ProductCard product={item} onHandleSelect={onHandleSelect} />;
    }
  };

  const onHandleSelect = (target) => {
    dispatch(selectProductsAction(target));
    navigation.navigate('ProductDetail');
  };

  if (products) {
    return (
      <View style={styles.container}>
        <Header text={'소미마켓'} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginVertical: 3,
            marginHorizontal: 15,
          }}>
          전체
        </Text>
        <FlatList
          style={styles.wraper}
          data={products}
          renderItem={renderItem}
          onEndReachedThreshold={0.3}
          onEndReached={getProductsData}
          keyExtractor={(item, index) => index}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.itempwaper}
        />
      </View>
    );
  } else {
    return null;
  }
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
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginHorizontal: 5,
  },
});
