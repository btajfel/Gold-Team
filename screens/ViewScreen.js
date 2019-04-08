import React, {Component} from "react";
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation, FileSystem } from 'expo';
import { StyleSheet, AppRegistry, View, FlatList, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Vid from './Vid';


export default class ViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
      const {navigate} = navigation;
      const params = navigation.state.params || {};
      return {
        headerRight: (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={params.sendEdits}
           >
           <Text style={{color: 'blue', fontSize: 18}}>Done</Text>
        </TouchableOpacity>
        ),
      };
    };

  constructor(props) {
    super(props);

    this.state = {
        data: [],
        error: null,
        loading: false,
        index: 0,
        videoUri: '',
    };
  }

  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    this.props.navigation.setParams({ sendEdits: this._sendEdits.bind(this)});
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'videos').catch(e => {
      console.log('Directory exists');
    });
    this.makeRemoteRequest();
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  onMount = () => {
  	const uri = this.props.navigation.getParam('uri', 0);

 	this.setState({
 		videoUri: uri,
 	})
  };

  paramsFunction = async () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  };  


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const params = {
      naturalSize: {
        orientation: 'landscape',
      }
    };

    const {uri} = this.state.videoUri

    console.log(this.state.videoUri)

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <NavigationEvents
          onDidFocus={() => this.paramsFunction()}
        /> 
        <View style={{flex: 1, flexDirection: 'column'}}> 
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.pictures}>
              <Vid
                uri={this.state.videoUri}
              />
            </View>
          </View>

        </View>
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
  picture: {
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  pictureWrapper: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
});
