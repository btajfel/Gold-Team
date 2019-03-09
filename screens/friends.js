import React from 'react';
import {Alert, StyleSheet, Text, View, FlatList} from 'react-native';
import Contacts from 'react-native-contacts';
import {Permissions, openSettings} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import {List, ListItem} from 'react-native-elements';


export default class FriendScreen extends React.Component {

  myContacts = [];

  componentDidMount() {

    const {nav} = this.props;

    nav.onNavigateShouldAllow(() => {
     return true;
   });


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
              this.myContacts.push({
                phoneNumber: (user.phoneNumbers && user.phoneNumbers[0]) ? user.phoneNumbers[0].number : '',
                fullName: user.givenName + ' ' + user.familyName,
                avatar: user.thumbnailPath
              }); 
            });
          }
        })
        }
        else{
          this.alertUserToAllowAccessToContacts();
        }
      })
    };

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
    };


    renderRow({item}) {
      return(
        <ListItem
        title = {item.fullName} 
        subtitle = {item.phoneNumber} 
        />
        );
    };

    render() {
      return(
        <View style = {styles.container}> 
        <Text style = {styles.header}> Invite Friends! </Text>
        <FlatList
        data = {this.myContacts}
        renderItem = {this.renderRow}
        keyExtractor = {item => item.fullName}
        />
        </View>
        );
    }
  };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      },
    header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
    });