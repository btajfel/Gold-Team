import React, {Component} from "react";
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation, FileSystem } from 'expo';
import { StyleSheet, AppRegistry, View, FlatList, Text } from 'react-native';
import { Row } from 'native-base';
import {NavigationEvents} from 'react-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import EditRender from './EditRender'
import Vid from './Vid';

const VIDEOS_DIR = FileSystem.documentDirectory + 'videos';

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        error: null,
        loading: false,
        index: 0,
        videoUri: '',
        startTime: 5,
        endTime: 25,
        min: 0,
        max: 0,
        cutTimes: [],
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'videos').catch(e => {
      console.log('Directory exists');
    });
    this.makeRemoteRequest();
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  toggleSelection = (uri) => {
    console.log("toggle", uri)
    this.setState({
      videoUri: uri,
    });
  };

  paramsFunction = async () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  };  

  onFetch = async(page = 1, startFetch, abortFetch) => {
    try {
        //This is required to determinate whether the first loading list is all loaded.
        let pageLimit = 24;
        if (this.state.layout === 'grid') pageLimit = 60;
        let skip = (page - 1) * pageLimit;

        // startFetch(rowData, pageLimit);
    } catch (err) {
        abortFetch(); //manually stop the refresh or pagination if it encounters network error
        console.log(err);
    }
  };

  makeRemoteRequest = async () => {
    // const info = await FileSystem.getInfoAsync("file:///var/mobile/Containers/Data/Application/BD57BBCB-EBF8-46E8-B6B5-7883370F69CE/Documents/ExponentExperienceData/%2540anonymous%252FGoldTeam-0a0f30ac-074f-43c9-9b8d-9d751fdd0afa/videos/test.mov")
    // console.log("Info", info)
    const projectid = this.props.navigation.getParam('projectid', 0);
    console.log("projectid", projectid)
    const url = `http://crewcam.eecs.umich.edu/api/v1/${projectid}/videos/`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          data: res.videos,
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  multiSliderValuesChange = (values) => {
    console.log(values)
    this.setState({
      startTime: values[0],
      endTime: values[1],
    })
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
        <View style={{flex: 1.5, flexDirection: 'column'}}>
          <FlatList
            ref={(ref) => this.listView = ref}
            data = {this.state.data}
            renderItem={({ item }) => (
              <EditRender 
                item={item}
                onSelectionToggle= {this.toggleSelection}
              />
            )}
            onFetch={this.onFetch}
            keyExtractor={item => item.videoid.toString()}
            numColumn={1}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}> 
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.pictures}>
              <Vid
                uri={this.state.videoUri}
              />
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'lightblue', alignItems: 'center'}}>
            <Text style={{ paddingTop: 20, fontWeight: 'bold' }}>Splice Videos</Text>
            <Text style={{ paddingTop: 10 }}>Start: {this.state.startTime}      End: {this.state.endTime}</Text>
            <View style={{ paddingTop: 20 }}>
              <MultiSlider
                values={[this.state.startTime, this.state.endTime]}
                onValuesChangeFinish={this.multiSliderValuesChange}
                selectedStyle={{backgroundColor: '#454d55'}}
                sliderLength={200}
                // customMarker={CustomMarker}
                min={0}
                max={30}
                step={1}
                snapped
                enabledOne
                enabledTwo
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
