/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Alert, Button, CameraRoll, NativeModules, TextInput, DeviceEventEmitter, Keyboard, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

const { RecorderManager } = NativeModules;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CrewCam</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.buttonContainer}>
          <Button
           onPress={() => this.props.navigation.navigate('Record')}
            title="Create New Video"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Library')}
            title="My Videos"
          />
        </View>
      </View>
    );
  }
}


class LibraryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>My Library</Text>
      </View>
    );
  }
}

class RecordScreen extends React.Component {
  state = {
    videoUri: null,
    disableStart: false,
    disableStopped: true,
    disablePlayable: true,
    androidVideoUrl: null,
    keyboardIsShown: false,
  }

  start = () => {
    RecorderManager.start();
    this.setState({
      disableStart: true,
      disableStopped: false,
      disablePlayable: true,
    });
  }

  stop = () => {
    RecorderManager.stop();
    this.setState({
      disableStart: true,
      disableStopped: true,
      disablePlayable: false,
    });
  }

  play = () => {
    switch (Platform.OS) {
      case 'android':
        const { androidVideoUrl } = this.state;   
        if (androidVideoUrl) {
          this.setState({
            videoUri: androidVideoUrl,
            disableStart: true,
            disableStopped: true,
            disablePlayable: true,
          })
        }
        break;

      case 'ios':
        CameraRoll.getPhotos({
          first: 1,
          assetType: 'Videos'
        }).then(r => {
          if (r.edges.length > 0) {
            const video = r.edges[0].node.image;
            this.setState({
              videoUri: video.uri,
              disableStart: true,
              disableStopped: true,
              disablePlayable: true,
            })
          }
        });
      break;  
    
      default:
        break;
    }
  }

  playEnded = () => {      
    this.setState({
      videoUri: null,
      disableStart: false,
      disableStopped: true,
      disablePlayable: true,
      androidVideoUrl: null,
    });
  }

  keyboardDidShow = () => {
    this.setState({keyboardIsShown: true});
  }
  
  keyboardDidHide = () => {
    this.setState({keyboardIsShown: false});
  }

  rendernControlBtnGroup = () => {
    const { disableStart, disableStopped, disablePlayable } = this.state;
    return (
      <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
        disabled={disableStart} 
        title="Start" 
        onPress={this.start} />
        </View>
        <View style={styles.buttonContainer}>
        <Button 
        disabled={disableStopped} 
        title="Stop" 
        onPress={this.stop} />
        </View>
        <View style={styles.buttonContainer}>
        <Button 
        disabled={disablePlayable} 
        title="Play" 
        onPress={this.play} />
        </View>
        </View>
    )
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('updateFilePath', (filePath) => {
      console.log(filePath);
      
      this.setState({androidVideoUrl: filePath});  
    });
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  render() {
    const { videoUri, keyboardIsShown } = this.state;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && keyboardIsShown &&
          this.rendernControlBtnGroup()
        }
        <View style={styles.content}>
          {videoUri && 
            <VideoPlayer
              source={{ uri: videoUri }}
              onEnd={this.playEnded}
            />
          }
          {!videoUri && 
            <TextInput
              style={styles.textInput}
              multiline
              underlineColorAndroid="white"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          }
        </View>
        {this.rendernControlBtnGroup()}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Library: LibraryScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);

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
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    fontSize: 24
  },
  footer: {
    backgroundColor: Platform.OS==='ios' ? '#eee' : '#fff',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 20,
  }
});
