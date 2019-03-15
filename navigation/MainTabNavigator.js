import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactsScreen from '../screens/ContactsScreen';
import RecordScreen from '../screens/RecordScreen';
import LibraryScreen from '../screens/LibraryScreen';

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
  /*
  headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        button = <ContactsScreen onPress={this.pressDone}>
        title = "Done"
        color = "#fff"
      />
    ),
    */
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

export default createBottomTabNavigator({
    ContactsStack,
    RecordStack,
    LibraryStack,
  },
  {
    initialRouteName: 'RecordStack',
  }
);
