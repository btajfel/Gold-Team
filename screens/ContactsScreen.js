import React, { Component } from 'react';
import { Alert, View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ContactRender from './ContactRender';
import {Permissions, openSettings} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RecordScreen from './RecordScreen';
import Geolocation from './Geolocation';



export default class SearchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    const params = navigation.state.params || {};
    return {
      headerRight: (
      <TouchableOpacity
          //onPress={() => navigate('Record', {invite: 5}) }
          style={styles.toggleButton}
          onPress={params.sendInvites}
         // onPress={() => { this.sendInvites; navigate('Record', {invite: 5, });  }}
         >
         <Text style={{color: 'blue', fontSize: 18}}>Done</Text>
      </TouchableOpacity>
      ),
      headerLeft: (
      <TouchableOpacity style={styles.toggleButton} onPress={() => navigate('Geo')}>
         <Text style={{color: 'blue', fontSize: 18}}>Find Nearby</Text>
      </TouchableOpacity>
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
      invited: [],
      totalUsers: [],
      myContacts: [],
    };

    this.contactholder = [];
    this.APIuserholder = [];
  }


  componentDidMount() {
    this.props.navigation.setParams({ sendInvites: this._sendInvites.bind(this) });
    this.makeUserAPIRequest();
    this.getUserContacts();
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
        this.APIuserholder = res.allContacts;
      })
      /*
      .then(() =>{
        this.joinList();
        })
        */
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


   toggleSelection = (username, isSelected) => {
    let inviteList = this.state.invited;
    if (isSelected) {
      inviteList.push(username);
    } else {
      inviteList = inviteList.filter(item => item !== username);
    }
    this.setState({ invited: inviteList });
  };

/*
  joinList = () =>{
    const usersList = this.state.users;
    const contactsList = this.arrayholder;
    let finalList = [];

    usersList.forEach(function(userData) {/*
      contactsList.forEach(function(contactData) {
        console.log("contacts " + contactData.name);
        console.log(contactData.phoneNumbers[0].digits);
        console.log("users " + userData.fullname)
        console.log(userData.phonenumber);
        /*
          if(userData.phonenumber === contactData.phoneNumbers[0].digits){
            console.log("GOT HERE");
            //finalList.push(contactData);
          }
        
    });
     });
  
    this.setState({
      totalUsers: finalList,
    })
    //console.log("here" + finalList);
  }
*/


  
  _sendInvites = async () => {
    const {navigate} = this.props.navigation;
   // console.log("invites sent");
    const invited = this.state.invited;
    console.log(invited);
    
    const url = 'http://crewcam.eecs.umich.edu/api/v1/invite/';
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             'inviteList': invited
          }) 
        })
        .then((response) =>{
          return response.json();
        })
        .then((data) =>{
          console.log(data.projectid);
          navigate('Record', {data: data.projectid}); 
        })
      } catch (e) {
        console.error(e)
      }
  };


  getUserContacts = async () => {
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
  this.contactholder = contacts.data;
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
    const newData = this.APIuserholder.filter(item => {
      const itemNumber = "phonenumber" in item ? `${item.phonenumber}` : '';
      const itemName = "fullname" in item ? `${item.fullname.toUpperCase()}` : '';
      const textData = text.toUpperCase();
      const itemData = itemName + itemNumber;
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      users: newData,
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
          data={this.state.users}
          renderItem={({ item }) => (
            <ContactRender 
              item={item}
              onSelectionToggle= {this.toggleSelection}
            />
          )}
          keyExtractor={item => item.phonenumber}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          refreshableMode="advanced"
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({

  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },


});




