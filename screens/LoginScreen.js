import React, { Component } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
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
    
  };

  loginFailed = async () => {
    Alert.alert(
      "Username or Password was incorrect",
        "Try again",
    
    [{text: "OK", style: 'cancel'}]
    )
  };

   createAccount = async () => {
    const {navigate} = this.props.navigation;
    navigate('SignUp');
  };

  forgotPassword = async () => {
    alert("Forgot Password");
  };



  onLoginPress = async () => {
     const { username, password } = this.state;
     const {navigate} = this.props.navigation;

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
          if (data.result === false){
            this.loginFailed();
          }
          else{
            navigate('Record');
          }
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
            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('SignUp')}>
            <View style = {styles.create}>
              <Text style = {styles.text}>Create Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.forgotPassword}>
            <View style = {styles.forgot}>
              <Text style={styles.text}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
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
create: {
  marginTop: 10,
  position: 'absolute',
  left:15,
},
forgot: {
  marginTop: 10,
  position: 'absolute',
  right:15,
},
text: {
  color: '#3897f1',
  backgroundColor: 'transparent',
},
otherButtons: {
  backgroundColor: 'transparent',
  borderRadius: 5,
  height: 15,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
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
