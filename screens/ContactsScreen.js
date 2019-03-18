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
          onPress={() => alert('Friends invited and ready to record!')}
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
      totalUsers: [],
      myContacts: [],
    };

    this.arrayholder = [];
    this.APIholder = [];
  }

  componentDidMount() {
   // this.makeRemoteRequest();
    this.getUserContacts();
    //this.makeUserAPIRequest();
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
  this.arrayholder = contacts.data;

  this.makeUserAPIRequest();
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
    const url = 'http://crewcam.eecs.umich.edu/api/v1/1/invite/';
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


  makeUserAPIRequest = () => {
    const url = `http://crewcam.eecs.umich.edu/api/v1/contacts/`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          users: res.allContacts,
          error: res.error || null,
          loading: false,
        });
        this.APIholder = res.allContacts;
      })
      .then(() =>{
        this.joinList();
        console.log("here2");
        })
      .catch(error => {
        this.setState({ error, loading: false });
      });
      
  };

  joinList = () =>{
    const usersList = this.state.users;
    const contactsList = this.state.myContacts;
    //console.log("here "); //+ Object.keys(usersList).length());
    let finalList = [];
/*
    usersList.forEach(function(userData) {
      contactsList.forEach(function(contactData) {
        console.log("contacts " + contactData.firstName);
        console.log(contactData.phoneNumbers[0].digits);
        console.log("users " + userData.fullname)
        console.log(userData.phonenumber);
          if(userData.phonenumber === contactData.phoneNumbers[0].digits){
            console.log("GOT HERE");
            //finalList.push(contactData);
          }
          
    });

    console.log("here2");
     });
     */
    this.setState({
      totalUsers: finalList,
    })
    //console.log("here" + finalList);
  }


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

  searchFilterFunction = async (text) => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemNumber = "phoneNumbers" in item ? `${item.phoneNumbers[0].digits}` : '';
      const itemName = "name" in item ? `${item.name.toUpperCase()}` : '';
      const textData = text.toUpperCase();
      const itemData = itemNumber + itemName;
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      myContacts: newData,
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

    // addInvite={(invite) => this.setState(prevState => ({
    //             results: prevState.results.concat(data),
    //             value: '',
    //           }))}
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.myContacts}
          renderItem={({ item }) => (
            <ContactRender 
              item={item}
            />
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
