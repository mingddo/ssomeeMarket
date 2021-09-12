import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Dimension,
  ScrollView,
  Dimensions,
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
  setCartAction,
} from '../store/actions/dataActions';
import useData from '../hooks/useData';

//Components
import Button from '../components/Button.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Carousel from '../components/Carousel.js';
import DetailHeader from '../components/DetailHeader.js';
import RenderHtml from 'react-native-render-html';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ProductDetail() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [images, setImages] = useState([]);
  const { categorys, products, selected, cart } = useData();
  const getImgUrl = (data) => {
    const tempURL = [];
    tempURL.push({ idx: 0, url: data.mainImage });
    data.detailImages.forEach((el) => {
      tempURL.push({ idx: el.index + 1, url: el.image });
    });
    setImages(tempURL);
  };
  useEffect(() => {
    getProductsPrefix(
      selected,
      (res) => {
        setDetail(res.data);
        getImgUrl(res.data);
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);
  const addCart = () => {
    if (detail) {
      dispatch(setCartAction(detail));
      navigation.navigate('Cart');
    }
  };

  return (
    <View style={styles.container}>
      <Header text={'상세보기'} />
      <ScrollView style={styles.body}>
        {images.length !== 0 && (
          <Carousel gap={0} offset={0} pageWidth={width} pages={images} />
        )}
        <View style={styles.detailInfo}>
          {detail && <DetailHeader product={detail} />}
        </View>
        {detail && (
          <RenderHtml
            contentWidth={width}
            source={{ html: detail.description }}
          />
        )}
      </ScrollView>
      {detail && <Footer soldout={detail.soldOut} onHandleAdd={addCart} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    height: height,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  body: {
    flex: 0.7,
    width: '100%',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingBottom: height * 0.25,
  },
  detailInfo: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    marginTop: -15,
    minHeight: height * 0.4,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  category: {
    fontSize: 10,
    color: 'grey',
    // marginBottom: height * 0.02,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: height * 0.02,
  },
});
