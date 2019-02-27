import React from 'react';
import {Platform, Button, StyleSheet, Text, View} from 'react-native';



export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'HomeScreen',
	};
  render() {
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CrewCam</Text>
        <View style={styles.buttonContainer}>
          <Button
           onPress={() => navigate('Record')}
            title="Create New Video" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigate('Library')}
            title="My Videos" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});