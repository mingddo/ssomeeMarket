import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import {
  getCategories,
  getProductsList,
  getProductsPrefix,
  orderProducts,
} from '../api/api.js';
import {
  getCategoryAction,
  getProductsAction,
  setCartAction,
  clearCartAction,
} from '../store/actions/dataActions';
import useData from '../hooks/useData';

import CartCard from '../components/CartCard.js';
import Header from '../components/Header.js';
import Button from '../components/Button.js';
import AlertModal from '../components/AlertModal.js';

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

export default function Cart() {
  const navigation = useNavigation();
  const [allPrice, setAllPrice] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { categorys, products, selected, cart } = useData();
  const dispatch = useDispatch();

  const onHandleBuy = () => {
    let flag = false;
    for (let [idx, c] of cart.entries()) {
      for (let i = 0; i < c.count; i++) {
        orderProducts(
          c.prefix,
          (res) => {
          },
          (err) => {
            console.error('err :>> ', err);
          },
        );
      }
      if (idx === cart.length - 1) {
        flag = true;
        setModalVisible(true);
      }
    }
    if (flag) {
      dispatch(clearCartAction());
    }
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
      navigation.navigate('ProductList');
    }, 2000);
  };
  const calcPrice = () => {
    let t = 0;
    let num = 0;
    for (let c of cart) {
      t += c.count * (c.detail.ssomeePrice + c.detail.shippingPrice);
      num += c.count;
    }
    setAllCount(num);
    setAllPrice(t);
  };

  useEffect(() => {
    if (cart) {
      calcPrice();
    }
  }, []);

  if (cart.length > 0) {
    return (
      <View style={styles.container}>
        <Header text={'????????????'} />
        <ScrollView>
          <View>
            {cart.map((item, idx) => {
              return (
                <CartCard
                  key={idx * 123123}
                  item={item.detail}
                  count={item.count}
                />
              );
            })}
          </View>
          <View style={styles.info}>
            <View style={styles.textWrapper}>
              <Text>??? ?????? ??????</Text>
              <Text>{allCount} ???</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text>??? ?????? ?????? </Text>
              <Text>
                {allPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ???
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button
          text={'????????????'}
          btnWidth={'100%'}
          btnHeight={windowHeight * 0.08}
          borderRadius={0}
          customFontSize={windowWidth * 0.036}
          onHandlePress={onHandleBuy}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {modalVisible && (
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={changeModalState}
            text={'????????? ?????? ???????????????.'}
            iconName={'checkcircle'}
            color={'green'}
            setTimeFunction={closeModal}
          />
        )}
        <Header text={'????????????'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: windowHeight,
    backgroundColor: 'white',
  },
  info: {
    fontSize: 10,
    width: windowWidth,
    height: windowHeight * 0.1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: '900',
  },
  textWrapper: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
