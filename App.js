import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Page
import ProductList from './src/pages/ProductList.js';
import ProductDetail from './src/pages/ProductDetail.js';
import Cart from './src/pages/Cart.js';

const Stack = createStackNavigator();

// redux
import { Provider } from 'react-redux';
import configureStore from './src/store';
const { store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
