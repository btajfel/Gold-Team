import React, { Component } from 'react';
import { Alert, View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ContactRender from './ContactRender';
import {Permissions, openSettings} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';



export default class SearchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
      <Button
          onPress={() => alert('This is a button!')}
          title="Done"
          color="black"
      />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      users: [],
      invite: [],
      myContacts: []
    };

    this.arrayholder = [];
    this.APIholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.makeUserAPIRequest();
    this.getUserContacts();
  //  this.timer = setInterval(()=> this.getInvites(), 5)
  }

/*
SHOULD PUT THIS ON RECORD SCREEN
  getInvites = () =>{
   fetch('invite api URL', {method: "GET"})
  .then((response) => response.json())
  .then((responseData) =>
  {
    if you receive invite, open alert for accept or deny request.
    if accept, send post to invite api to add it to collaborators table and delete it from pending invites table
    by checking for it by users and project id
    //set your data here
     console.log(responseData);
  })
  .catch((error) => {
      console.error(error);
  });
}
*/

/*
pressDone = (type, item) => {
    this.setState({ inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off'});
  };
*/
  
  async getUserContacts(){
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
     if (permission.status !== 'granted') {
    this.alertUserToAllowAccessToContacts();
    }

    const contacts = await Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS,
      Expo.Contacts.PHONETIC_FIRST_NAME,
      Expo.Contacts.PHONETIC_LAST_NAME,
    ],
  });

  this.setState({
          myContacts: contacts.data
        });
  };

alertUserToAllowAccessToContacts = () => {
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

  
  async sendInvites(){
    const invited = this.state.invite;
    const url = 'http://localhost:8000/api/v1/1/invite/';
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: invited
        });
        alert('Send invites');
      } catch (e) {
        console.error(e)
      }
  }



  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  makeUserAPIRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: res.results,
          error: res.error || null,
          loading: false,
        });
        this.APIholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.APIholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };


  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.myContacts}
          renderItem={({ item }) => (
            <ContactRender item={item}/>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          refreshableMode="advanced"
        />
      </View>
    );
  }
}
