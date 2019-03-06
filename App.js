/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import {Platform, Text, View} from 'react-native';
import {createAppContainer, createStackNavigator, StackNavigator} from 'react-navigation';
import friends from './screens/friends'
import home from './screens/home'
import library from './screens/library'
import record from './screens/record'



const Navigation = createStackNavigator(
  {
    Home: {screen: home},
    Record: {screen: record},
    Library: {screen: library},
    Friends: {screen: friends},
  },
  {
    initialRouteName: "Record",
    navigationOptions: {
        gesturesEnabled: true,
    }
  }
);

export default createAppContainer(Navigation);
