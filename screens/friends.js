import React from 'react';
import {Alert, Platform, Flatlist, Button, StyleSheet, Text, View} from 'react-native';
import Contacts from 'react-native-unified-contacts';


export default class FriendScreen extends React.Component {
  state = {
    contact: []
  };

  componentDidMount(){
  this.getContacts();
};

alertUserToAllowAccessToContacts() {
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
};

getContacts(){
  Contacts.checkPermission((error, res) => {
    if (res === 'authorized'){
     Contacts.getAll((err, contact) => {
      if (err) {
        throw err;
      }
      else{
        this.setState({contact});
      }
    })
   }
 })
};

static navigationOptions = {
  title: 'FriendScreen'
};
renderItem({item, index}) {
  const number = item.phoneNumber.map((val, key) => {if(key === 0) return val.number});
  return(
    <View> 
    <Text> {item.givenName} {item.familyName} {number} </Text>
    </View>
    );
};
render() {
  var {navigate} = this.props.navigation;
  return (
    <Flatlist
    data = {this.state.contact}
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