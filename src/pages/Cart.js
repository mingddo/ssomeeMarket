import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export default function Cart(){
  const navigation = useNavigation()

  const gotoList = ()=>{
    navigation.navigate('ProductList')
  }
  return (
    <View>
      <Text onPress={gotoList}>
        여기는 장바구니 입니다.
      </Text>
    </View>
  )
}