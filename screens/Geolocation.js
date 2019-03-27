import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList, 
  ActivityIndicator,
} from "react-native";
import { Constants, Location, Permissions } from 'expo';
import ContactRender from './ContactRender';

export default class Geolocation extends Component {

    constructor(props) {
    super(props);

    this.state = {
    loading: false,
    myLocation: null,
    errorMessage: null,
    userDistances: [],
    nearby: [],
    invited: [],
  };

    //this.nearbyHolder = [];
  }

  componentDidMount() {
      this._getMyLocation();
  }




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

          if (diff === 0){
            diff = 0.1;
          }

        if (diff <= 2.0){
          nearbyHolder.push({fullname: user.fullname, username: user.username, distance: diff});
        }
        });
        this.setState({
          nearby: nearbyHolder
        })
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
 

  render() {
     if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Waiting... </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.nearby}
          renderItem={({ item }) => (
            <ContactRender 
              item={item}
              onSelectionToggle= {this.toggleSelection}
            />
          )}
          keyExtractor={item => item.username}
          refreshableMode="advanced"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});