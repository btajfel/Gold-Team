import React, { Component } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert, KeyboardAvoidingView, StyleSheet, AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';


export default class ProjectSettings extends Component {
    constructor(props) {
    super(props);
    
    this.state = {
      rename: '',
    };
  }

    componentDidMount() {
  }

  componentWillUnmount() {
  }



  onRenamePress = async () => {
     const rename = this.state.rename;
     const {navigate} = this.props.navigation;
     const username = await AsyncStorage.getItem("userToken");
     const pid = this.props.navigation.getParam('projectid', 0);

    const url = `http://crewcam.eecs.umich.edu/api/v1/${username}/projects/${pid}/`;
        fetch(url, {
          method: 'POST',
          body: JSON.stringify( {
             rename: rename,
          })
        })
        .then((res) => {
		    	if (!res.ok) throw Error(res.statusText); 
          navigate('Library');       
		    })
	      .catch((e) => {
	        console.error(e)
	      })
  };


  onDeletePress = async () => {
     const {navigate} = this.props.navigation;
     const username = await AsyncStorage.getItem("userToken");
     const pid = this.props.navigation.getParam('projectid', 0);

    const url = `http://crewcam.eecs.umich.edu/api/v1/${username}/projects/${pid}/delete/`;
        fetch(url, {
          method: 'POST',
        })
		    .then((res) => { 
		    	if (!res.ok) throw Error(res.statusText);
		     	navigate('Library');
		    })
	      .catch((e) => {
	        console.error(e)
	      })
  };


  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Settings</Text>
            <TextInput placeholder="Rename project" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
              value={this.state.rename} onChangeText={(rename) => this.setState({ rename })}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onRenamePress()}
              title="Rename Project"
            />
            <View style={{ paddingTop: 100 }}>
	            <Button
	              buttonStyle={styles.deleteButton}
	              onPress={() => this.onDeletePress()}
	              title="Delete Project"
	            />
	        </View>
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
  marginTop: 30,
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
deleteButton: {
  backgroundColor: 'red',
  borderRadius: 5,
  height: 45,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
},
});
