import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
const orderList = [
  {
    name: '낮은 가격 순',
    value: 'price-asc',
  },
  {
    name: '높은 가격 순',
    value: 'price-desc',
  },
  {
    name: '최신순',
    value: 'date-desc',
  },
];

export default function ProductList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categories, products } = useData();
  const flatListRef = React.useRef();
  const [maxPage, setMaxPage] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [order, setOrder] = useState('date-desc');
  const [List, setList] = useState([]);

  useEffect(() => {
    getCategories(
      (res) => {
        dispatch(getCategoryAction(res.data));
      },
      (err) => {
        console.error(err);
      },
    );
    getProductsDataByFilter('date-desc');
  }, []);

  const infiniteScrollGetData = () => {
    if (pageNum !== maxPage) {
      getProductsList(
        'all',
        pageNum + 1,
        order,
        (res) => {
          setList([...List, ...res.data.products]);
          // dispatch(getProductsAction(res.data.products));
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

  const getProductsDataByFilter = (val) => {
    getProductsList(
      'all',
      1,
      val,
      (res) => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        setList(res.data.products);
        setMaxPage(res.data.maxPage);
        // dispatch(getProductsAction(res.data.products));
      },
      (err) => {
        console.error(err);
      },
    );
  };

  const onHandleSelect = (target) => {
    dispatch(selectProductsAction(target));
    navigation.navigate('ProductDetail');
  };

  const renderItem = useCallback(({ item }) => {
    if (item) {
      return <ProductCard product={item} onHandleSelect={onHandleSelect} />;
    }
  }, []);

  const keyExtractor = useCallback((item, idx) => idx, []);

  if (List) {
    return (
      <View style={styles.container}>
        <Header text={'소미마켓'} />
        <View style={styles.orderFrame}>
          {orderList.map((item, idx) => {
            return (
              <Text
                key={idx}
                onPress={() => {
                  if (item.value !== order) {
                    setPageNum(0);
                    setOrder(item.value);
                    getProductsDataByFilter(item.value);
                  }
                }}
                style={{
                  color: item.value === order ? 'red' : 'grey',
                  fontWeight: item.value === order ? 'bold' : 'normal',
                  fontSize: 11,
                  marginHorizontal: 3,
                }}>
                {item.name}
              </Text>
            );
          })}
        </View>
        <FlatList
          ref={flatListRef}
          style={styles.wraper}
          data={List}
          renderItem={renderItem}
          onEndReachedThreshold={0.3}
          onEndReached={infiniteScrollGetData}
          keyExtractor={keyExtractor}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.itempwaper}
          removeClippedSubviews={true}
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
  orderFrame: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width,
    height: height * 0.03,
    paddingHorizontal: 15,
    // backgroundColor: 'red',
  },
});
