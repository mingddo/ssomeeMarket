import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import CarouselItem from './CarouselItem.js';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  indicator: {
    marginVertical: 0,
    marginHorizontal: 4,
    height: 6,
    borderRadius: 3,
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function Carousel({ pages, pageWidth, gap, offset }) {
  const [page, setPage] = useState(0);

  function renderItem({ item }) {
    return <CarouselItem item={item} />;
  }

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    if (Math.abs(newPage) !== page) {
      console.log(`newPage`, newPage);
      setPage(Math.abs(newPage));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => `page__${item.idx}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorWrapper}>
        {pages.length !== 0 &&
          pages.map((k, i) => {
            return (
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: i === page ? 'black' : 'grey',
                    width: i === page ? 18 : 6,
                  },
                ]}
                key={`indicator_${i}`}
              />
            );
          })}
      </View>
    </View>
  );
}
