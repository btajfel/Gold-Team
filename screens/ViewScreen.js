import React, {Component} from "react";
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation, FileSystem } from 'expo';
import { StyleSheet, AppRegistry, View, FlatList, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Vid from './Vid';

const VIDEOS_DIR = FileSystem.documentDirectory + 'videos';

export default class ViewScreen extends React.Component {


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

    this.onMount();
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  onMount = async () => {
  	const projectid = this.props.navigation.getParam('projectid', 0);
  	const uri = this.props.navigation.getParam('uri', 0);
  	console.log(uri)

  	// const info = await FileSystem.getInfoAsync(`file:///var/mobile/Containers/Data/Application/BD57BBCB-EBF8-46E8-B6B5-7883370F69CE/Documents/ExponentExperienceData/%2540anonymous%252FGoldTeam-0a0f30ac-074f-43c9-9b8d-9d751fdd0afa/videos/${uri}`)
   //  console.log("Info", info)


    FileSystem.downloadAsync(
      `http://crewcam.eecs.umich.edu/api/v1/${projectid}/render/`,
      `${VIDEOS_DIR}/${uri}`
    )
    .then(({ uri }) => {
      console.log("null")
      this.setState({ 
          videoUri: uri
      });
    })
    .catch(error => {
      console.error(error);
    });

 	// this.setState({
 	// 	videoUri: uri,
 	// })
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
