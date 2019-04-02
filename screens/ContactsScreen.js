import React, { Component } from 'react';
import { Alert, View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ContactRender from './ContactRender';
import {openSettings} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RecordScreen from './RecordScreen';
import Geolocation from './Geolocation';
import { Constants, Location, Permissions } from 'expo';



export default class SearchScreen extends Component {

    static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    const params = navigation.state.params || {};
    return {
      headerRight: (
      <TouchableOpacity
          style={styles.toggleButton}
          onPress={params.sendInvites}
         >
         <Text style={{color: 'blue', fontSize: 18}}>Done</Text>
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
      myLocation: null,
      userDistances: [],
      nearby: [],
      users: [],
      invited: [],
      totalUsers: [],
      myContacts: [],
    };

    this.contactholder = [];
    this.APIuserholder = [];
  }


  componentDidMount() {
    this.props.navigation.setParams({ sendInvites: this._sendInvites.bind(this)});
    this._getMyLocation();
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

  _getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let myLoc = await Location.getCurrentPositionAsync({});
    this.setState({myLocation: myLoc });

    this._getUserLoactions();
  };

    _getUserLoactions = async () => {    
    const url = 'http://crewcam.eecs.umich.edu/api/v1/location/';
    this.setState({ loading: true });
      await fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          userDistances: res.allUsers,
        });
      })
      .then(() =>{
        this.calcDistances();
        this.setState({
          loading: false,
        });
                  
      })
      .catch(errorMessage => {
        this.setState({ errorMessage, loading: false });
      });
    };



      calcDistances = () => {
        const myLoc = this.state.myLocation;
        const users = this.state.userDistances;
        const myLat = myLoc.coords.latitude;
        const myLong = myLoc.coords.longitude;
        var nearbyHolder = [];

        users.forEach(function(user) {
        const lat = user.latitude;
        const long = user.longitude;
        var diff = (function() {
          if ((myLat === lat) && (myLong === long)) {
             return 0;
          }
          else{
          var radlat1 = Math.PI * myLat/180;
          var radlat2 = Math.PI * lat/180;
          var theta = long-myLong;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          dist = Math.round(dist*100)/100
          return dist;
       }
          })(); 

        if (diff <= 1.0 && diff !== 0){
          nearbyHolder.push({fullname: user.fullname, username: user.username, distance: diff});
        }
        });
        this.setState({
          nearby: nearbyHolder
        })
      };


  
  _sendInvites = async () => {
    const {navigate} = this.props.navigation;
    const invited = this.state.invited;
    
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
          navigate('Record', {data: data.projectid}); 
        })
      } catch (e) {
        console.error(e)
      }
  };



  getUserContacts = async () => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
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
    const users = this.state.users
    const nearby = this.state.nearby
    const combo = nearby.concat(users);
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
          data={combo}
          renderItem={({ item }) => (
            <ContactRender 
              item={item}
              onSelectionToggle= {this.toggleSelection}
            />
          )}
          keyExtractor={item => item.username}
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




