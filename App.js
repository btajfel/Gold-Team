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
import SwipeNavigator from 'react-native-swipe-navigation'
import friends from './screens/friends'
import library from './screens/library'
import record from './screens/record'

const Navigator = SwipeNavigator({
  record: {
    screen: record,
    left: 'friends',
    right: 'library',
  },

  friends: {
    screen: friends,
    type: 'over',
  },

  library: {
    screen: library,
    type: 'over',
  }
})

export default Navigator



