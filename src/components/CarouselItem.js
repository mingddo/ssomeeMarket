import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
  pageItem: {
    width: width,
    height: 'auto',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});

export default function CarouselItem({ item }) {
  return <Image style={styles.pageItem} source={{ uri: item.url }} />;
}
