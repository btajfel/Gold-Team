import React from 'react';
import {Platform, Button, StyleSheet, Text, View} from 'react-native';



export default class RecordScreen extends React.Component {
  static navigationOptions = {
    title: 'RecordScreen'
  };
  render() {
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>RecordScreen</Text>
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