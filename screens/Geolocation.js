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
  state = {
    loading: false,
    myLocation: null,
    errorMessage: null,
    userDistances: [],
    nearby: [],
    invited: [],
  };

  componentWillMount() {
      this._getMyLocation();
      this._getUserLoactions();
  }


  toggleSelection = (phonenumber, isSelected) => {
    let inviteList = this.state.invited;
    if (isSelected) {
      inviteList.push(phonenumber);
    } else {
      inviteList = inviteList.filter(item => item !== phonenumber);
    }
    this.setState({ invited: inviteList });
  };



  _getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let myLocation = await Location.getCurrentPositionAsync({});
    this.setState({ myLocation });
  };

    _getUserLoactions = async () => {    
    const url = 'http://crewcam.eecs.umich.edu/api/v1/location/';
    this.setState({ loading: true });
/*
      await fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          userDistances: data.allUsers,
          loading: false,
        });
      })
      .then(() =>{
        this.calcDistances();
      })
      .catch(errorMessage => {
        this.setState({ errorMessage, loading: false });
      });
      */
    };



      calcDistances = async () => {
        const users = this.state.userDistances;
        const myLat = this.state.myLocation.coord.latitude;
        const myLong = this.state.myLocation.coord.longitude;

        users.forEach(function(user) {
        const lat = user.latitude;
        const long = user.longitude;
        const diff = getDistance(myLat,MyLong,lat,long);

        if (diff <= 1.0){
          this.setState({ nearby: [this.state.nearby, [user.fullname, user.phonenumber]] })
        }
        });
      }



  getDistance = async (lat1,lon1,lat2,lon2) => {
  var R = 3958.8; // Radius of the earth in mi
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in mi
  return d;
}

 deg2rad = async (deg) => {
  return deg * (Math.PI/180)
}


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
          keyExtractor={item => item.phonenumber}
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