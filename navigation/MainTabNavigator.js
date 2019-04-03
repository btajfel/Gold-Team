import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactsScreen from '../screens/ContactsScreen';
import RecordScreen from '../screens/RecordScreen';
import LibraryScreen from '../screens/LibraryScreen';
import Geolocation from '../screens/Geolocation';
import SharedProjects from '../screens/SharedProjects';
import EditScreen from '../screens/EditScreen';


const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  Geo: Geolocation,
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Invite',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),

};

const RecordStack = createStackNavigator({
  Record: RecordScreen,
});

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
    />
  ),
};

const LibraryStack = createStackNavigator({
  Library: LibraryScreen,
  Edit: EditScreen,
});

LibraryStack.navigationOptions = {
  tabBarLabel: 'Library',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
    />
  ),
};

const SharedStack = createStackNavigator({
  Shared: SharedProjects,
});


const EditStack = createStackNavigator({
  Edit: EditScreen,
});


export default createBottomTabNavigator({
    ContactsStack,
    RecordStack,
    LibraryStack,
  },  
  {
    initialRouteName: 'RecordStack',
  }
);
