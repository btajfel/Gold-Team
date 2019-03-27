import React, { Component } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';


export default class SignUpScreen extends Component {
    constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      fullname: '',
      phonenumber: '',
      email: '',
    };
  }

    componentDidMount() {
  }

  componentWillUnmount() {
  }



  onCreatePress = async () => {
     const { username, password, fullname, phonenumber, email } = this.state;
     const {navigate} = this.props.navigation;

    const url = 'http://crewcam.eecs.umich.edu/api/v1/create/';
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             username: username,
             password: password,
             fullname: fullname,
             phonenumber: phonenumber,
             email: email,
          }) 
        })
        .then((response) =>{
          navigate('Login');
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
          <Text style={styles.logoText}>SignUp</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             value={this.state.username} onChangeText={(username) => this.setState({ username })} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              value={this.state.password} onChangeText={(password) => this.setState({ password })}/>
            <TextInput placeholder="Full Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             value={this.state.fullname} onChangeText={(fullname) => this.setState({ fullname })} />
            <TextInput placeholder="Phone number" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              value={this.state.phonenumber} onChangeText={(phonenumber) => this.setState({ phonenumber })}/>
            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              value={this.state.email} onChangeText={(email) => this.setState({ email })}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onCreatePress()}
              title="Create Account"
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