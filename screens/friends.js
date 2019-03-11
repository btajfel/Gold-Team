import React from 'react';
import {Alert, StyleSheet, Text, View, FlatList, Dimensions, AppRegistry, TouchableOpacity, Button, StatusBar} from 'react-native';
import Contacts from 'react-native-contacts';
import {Permissions, openSettings} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import {ListItem, List, Icon} from 'react-native-elements';
import SearchHeader from 'react-native-search-header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import contact from './contact';



export default class FriendScreen extends React.Component {


    state = {
        myContacts:[],
        inviteList:[],
    };


    componentDidMount() {
        const {nav} = this.props;

        nav.onNavigateShouldAllow(() => {
           return true;
       })
 /*
     PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {

      */


      Contacts.checkPermission((error, res) => {
        if (res === 'authorized'){
          Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
               throw err;
           } else {
            contacts = contacts.map((user) => {
        //Loop through phone numbers in database. Only push if number matches one in database
        this.state.myContacts.push({
            phoneNumber: (user.phoneNumbers && user.phoneNumbers[0]) ? user.phoneNumbers[0].number : '',
            fullName: user.givenName + ' ' + user.familyName,
        })
    })
        }
    })
      }
      else{
          this.alertUserToAllowAccessToContacts();
      }
  })
  }

componentWillUnmount() {
    this.props.nav.cleanUp()
}




alertUserToAllowAccessToContacts() {
  Alert.alert(
    "Can't Access Your Contacts",
    "Click on Open Settings and allow CrewCam to access your Contacts.\n" +
    "\n" +
    "Then come back!",
    [
    {text: "Later", style: 'cancel'},
    {text: 'Open Settings', onPress: () => Permissions.openSettings() }
    ]
    )
}


render() {

  const row = this.state.myContacts.map(result =>
    <renderRow key= {result.fullName} data = {result} />

    )

  return(
    <View style = {styles.container}> 
    <Text style = {styles.title}> Invite Friends! </Text>
    <StatusBar barStyle = 'light-content' />
    <View style = { styles.search }>
    <Ionicons name="ios-search" size={32} color="gray" 
    onPress = {() => this.searchHeader.show()}
    />
    </View>

    <FlatList
                data = {this.state.myContacts}
                renderItem = {row}
                keyExtractor = {item => item.fullName}
                extraData = {this.state}
                />

    <SearchHeader
    ref = {(searchHeader) => {
        this.searchHeader = searchHeader;
    }}
    placeholder = 'Search...'
    placeholderColor = 'gray'
    onGetAutocompletions = {async (text) => {
        if (text) {
                        //could change this auto coompletion for phone numbers in data base
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    } else {
                        return [];
                    }
                }}
  />
        
                </View>
                )
}
};


const DEVICE_WIDTH = Dimensions.get(`window`).width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
},
title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
},   
search: {
    justifyContent: 'flex-start',
    marginLeft: 10
},
label: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: `600`,
    textAlign: `left`,
    marginVertical: 8,
    paddingVertical: 3,
    color: `#f5fcff`,
    backgroundColor: `transparent`
}
    });