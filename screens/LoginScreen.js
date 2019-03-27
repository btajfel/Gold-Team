import React, { Component } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';


export default class LoginScreen extends Component {
    constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

    componentDidMount() {
  }

  componentWillUnmount() {
  }

  loginSuccess = async () => {
    const {navigate} = this.props.navigation;
  };

  loginFailed = async () => {
    Alert.alert(
      "Username or Password was incorrect",
        "Try again",
    
    [{text: "OK", style: 'cancel'}]
    )
  };



  onLoginPress = async () => {
     const { username, password } = this.state;

    const url = 'http://crewcam.eecs.umich.edu/api/v1/login/';
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             username: username,
             password: password
          }) 
        })
        .then((response) =>{
          return response.json();
        })
        .then((data) =>{
          console.log(data); 
        })
      } catch (e) {
        console.error(e)
      }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>CrewCam</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             value={this.state.username} onChangeText={(username) => this.setState({ username })} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              value={this.state.password} onChangeText={(password) => this.setState({ password })}
              />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
},
});
