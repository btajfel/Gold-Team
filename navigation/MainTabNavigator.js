import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactScreen from '../screens/ContactScreen';
import RecordScreen from '../screens/RecordScreen';
import LibraryScreen from '../screens/LibraryScreen';
import Geolocation from '../screens/Geolocation';
import SharedProjects from '../screens/SharedProjects';
import EditScreen from '../screens/EditScreen';
import ContactShare from '../screens/ContactShare';
import ProjectSettings from '../screens/ProjectSettings';
import ViewScreen from '../screens/ViewScreen';


const ContactsStack = createStackNavigator({
  Contacts: ContactScreen,
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

const SharedLibraryStack = createMaterialTopTabNavigator(
  {
  "My Library": LibraryScreen,
  "Shared With Me": SharedProjects,
 },
 {
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null,
      headerMode: 'none',
      tabBarVisible: true,
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        return <Text>{routeName}</Text>;
      },
    }),
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      indicatorStyle: {
        backgroundColor: 'blue',
      },
      labelStyle: {
        fontSize: 15,
      },
      tabStyle: {
        marginTop: 35,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
      style: {
        backgroundColor: 'white',
      },
      statusBarStyle: 'light-content',
    },
  },

);

const LibraryStack = createStackNavigator({
  Library: SharedLibraryStack,
  Edit: EditScreen,
  Share: ContactShare,
  Settings: ProjectSettings,
  View: ViewScreen,
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
