import React, { Component } from 'react';
import { Alert, View, Text, Button, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ContactRender from './ContactRender';
import {openSettings} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Constants, Location, Permissions } from 'expo';



export default class ContactShare extends Component {

    static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    const params = navigation.state.params || {};
    return {
      headerRight: (
      <TouchableOpacity
          style={styles.toggleButton}
          onPress={params.sendShare}
         >
         <Text style={{color: 'blue', fontSize: 18}}>Share</Text>
      </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      users: [],
      shared: [],
    };

    this.APIuserholder = [];
  }


  componentDidMount() {
    this.props.navigation.setParams({ sendShare: this._sendShare.bind(this)});
    this.makeUserAPIRequest();
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
        this.removeUser();
        })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


   toggleSelection = (username, isSelected) => {
    let sharedList = this.state.shared;
    if (isSelected) {
      sharedList.push(username);
    } else {
      sharedList = sharedList.filter(item => item !== username);
    }
    this.setState({ shared: sharedList });
  };

    removeUser = async () => {
    const users = this.APIuserholder;

    for(var k=0; k< users.length; ++k) {
       if(users[k].username === await AsyncStorage.getItem("userToken")){
              users.splice(k, 1);
            }
    }
            

    this.APIuserholder = users;


  this.setState({
    users: users
  })
    };


  
  _sendShare = async () => {
    const {navigate} = this.props.navigation;
    const shared = this.state.shared;
    const username = await AsyncStorage.getItem("userToken");
    const pid = this.props.navigation.getParam('pid', 0);
    
    const url = 'http://crewcam.eecs.umich.edu/api/v1/shared/';
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             'owner': username,
             'pid': pid,
             'sharedList': shared
          }) 
        })
        .then((response) =>{
          return response.json();
        })
        .then((data) =>{
          navigate('Library'); 
        })
      } catch (e) {
        console.error(e)
      }
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
      user: newData,
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
    users = this.state.users;
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
          data={users}
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
