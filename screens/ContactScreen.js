import React, { Component } from 'react';
import { Alert, View, Text, Button, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ContactRender from './ContactRender';
import {openSettings} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import {createStackNavigator, createAppContainer, NavigationEvents} from 'react-navigation';
import RecordScreen from './RecordScreen';
import Geolocation from './Geolocation';
import { Constants, Location, Permissions, ScreenOrientation } from 'expo';



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
         <Text style={{color: 'blue', fontSize: 18}}>Invite</Text>
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
      combo: [],
    };

    this.nearbyHolder = [];
    this.APIuserholder = [];
    this.comboHolder = [];
  }


  componentDidMount() {
    this.props.navigation.setParams({ sendInvites: this._sendInvites.bind(this)});
    this._getMyLocation();
    //this.getUserContacts();
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
      .then(() =>{
        this.comboState();
        })
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
        this.makeUserAPIRequest();
        this.setState({
          loading: false,
        });
                  
      })
      .catch(errorMessage => {
        this.setState({ errorMessage, loading: false });
      });
  };

  paramsFunction = async () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  };  

  calcDistances = () => {
    const myLoc = this.state.myLocation;
    const users = this.state.userDistances;
    const myLat = myLoc.coords.latitude;
    const myLong = myLoc.coords.longitude;
    let nearby = [];

    users.forEach(function(user) {
    const lat = user.latitude;
    const long = user.longitude;
    let diff = (function() {
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

      if (diff === 0){
        diff = 0.1
      }

    if (diff <= 1.0){
      nearby.push({fullname: user.fullname, username: user.username, phonenumber: user.phonenumber, distance: diff});
    }
    });
    this.nearbyHolder = nearby.sort(function(a, b) {
                      return parseFloat(a.distance) - parseFloat(b.distance);
                      });
    this.setState({
      nearby: nearby
    })
  };


  
  _sendInvites = async () => {
    const {navigate} = this.props.navigation;
    const invited = this.state.invited;
    const username = await AsyncStorage.getItem("userToken");
    let projectid = 0
    
    fetch(`http://crewcam.eecs.umich.edu/api/v1/${username}/projects/`, {
          method: 'POST',
          body: JSON.stringify({
             projectId: projectid,
          })
        })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(data => {
        console.log(data.projectid)
        const projectid = data.projectid
        const url = 'http://crewcam.eecs.umich.edu/api/v1/invite/';
        fetch(url, {
          method: 'POST',
          body: JSON.stringify( {
            projectid: projectid,
            inviteList: invited,
            username: username,
          }) 
        })
        .then((res) =>{
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
        .then((data) =>{
          navigate('Record', {data: data.projectid}); 
        })
        .catch((e) => {
          console.error(e)
        })
      })
      .catch(error => {
        console.log(error)
      });
  };


/*
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
  */

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


comboState = async () => {
  const users = this.APIuserholder;
  const nearby = this.nearbyHolder;
  var combo = nearby.concat(users);
    for(var i=0; i< combo.length; ++i) {
        for(var j=i+1; j< combo.length; ++j) {
            if(combo[i].username === combo[j].username){
                combo.splice(j--, 1);
              }
        }
    }

    for(var k=0; k< combo.length; ++k) {
       if(combo[k].username === await AsyncStorage.getItem("userToken")){
              combo.splice(k, 1);
            }
    }
            

    this.comboHolder = combo;


  this.setState({
    combo: combo
  })
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

    const newData = this.comboHolder.filter(item => {
      const itemNumber = "phonenumber" in item ? `${item.phonenumber}` : '';
      const itemName = "fullname" in item ? `${item.fullname.toUpperCase()}` : '';
      const textData = text.toUpperCase();
      const itemData = itemName + itemNumber;
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      combo: newData,
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
    const combo = this.state.combo;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
      <NavigationEvents
        onDidFocus={() => this.paramsFunction()}
      /> 
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

