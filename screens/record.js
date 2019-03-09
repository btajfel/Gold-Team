import React from 'react';
import {Platform, Button, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class RecordScreen extends React.Component {
    componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>RecordScreen</Text>
        <View style={styles.plusButton}>
        <Ionicons name="ios-add" size={32} color="blue" 
        onPress={() => navigate('Friends')}/>
        </View>
        <View style={styles.libraryButton}>
        <Ionicons name="ios-images" size={32} color="blue" 
        onPress={() => navigate('Library')}/>
        </View>
        <View style={styles.playButton}>
        <Ionicons name="ios-play" size={50} color="black" />
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
  plusButton: {
    position: 'absolute',
    bottom: 15,
    left: 15
  },
  libraryButton: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  playButton: {
    position: 'absolute',
    bottom: 15
  } 
});