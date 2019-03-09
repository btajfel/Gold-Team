import React from 'react';
import {Alert, Platform, Linking, Button, StyleSheet, Text, View, ScrollView} from 'react-native';
import Contacts from 'react-native-contacts';
import {Permissions, openSettings} from 'react-native-permissions';


export default class FriendScreen extends React.Component {
    
  myContacts = [];

    componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });

    this.getContacts();
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
};

getContacts(){
  Contacts.checkPermission((error, res) => {
    if (res === 'authorized'){
     Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      else{
        contacts = contacts.map((user) => {

        this.myContacts.push({
          fullName: user.givenName + ' ' + user.familyName,
          phoneNumber: user.phoneNumbers[0]
        })


        })

        console.log(this.myContacts);
      }
    })
   }
   else{
    this.alertUserToAllowAccessToContacts();
   }
 })
};


renderItem({item, index}) {
  const number = item.phoneNumber.map((val, key) => {if(key === 0) return val.number});
  return(
    <View> 
    <Text> {item.fullName} {number} </Text>
    </View>
    );
};


render() {
  return (
    <ScrollView
    data = {this.myContacts}
    renderItem = {(a) => this.renderItem(a)}
    keyExtractor = {(item, index) => index.toString()}
    />
    );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});