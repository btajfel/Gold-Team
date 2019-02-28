import React from 'react';
import {Platform, Button, StyleSheet, Text, View} from 'react-native';
import Contacts from 'react-native-unified-contacts';

/*
Contacts.getAll((err, contacts) => {
  if (err) {
    throw err;
  }
  else{
    console.log("no contacts");
  }
})
*/
/*
Contacts.userCanAccessContacts( (userCanAccessContacts) => {
  if (userCanAccessContacts) {
    console.log("User has access to Contacts!");

Contacts.getAll((err, contacts) => {
  if (err) {
    throw err;
  }
  else{
    console.log("no contacts");
  }
})

  }
  else {
    console.log("User DOES NOT have access to Contacts!");
    alertUserToAllowAccessToContacts()
  }
});

function alertUserToAllowAccessToContacts() {
  Alert.alert(
    "Can't Access Your Contacts",
    "Click on Open Settings and allow ntwrk to access your Contacts.\n" +
    "\n" +
    "Then come back!",
    [
      {text: 'Open Settings', onPress: () => Contacts.openPrivacySettings() },
      {text: "Later"}
    ]
  )
}
*/


export default class FriendScreen extends React.Component {
	static navigationOptions = {
		title: 'FriendScreen'
	};
  render() {
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>My Friends</Text>
      </View>
    );
  }
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