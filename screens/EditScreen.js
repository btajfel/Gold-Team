import React, {Component} from "react";
import { ExpoConfigView } from '@expo/samples';
import { Video, ScreenOrientation } from 'expo';
import { StyleSheet, AppRegistry, View, FlatList, Text } from 'react-native';
import { Row } from 'native-base';
import EditRender from './EditRender'

export default class EditScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
        data: [],
        error: null,
        loading: false,
        index: 0,
        videoUri: {
          uri: ''
        },
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    this.makeRemoteRequest();
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  toggleSelection = (uri) => {
    console.log("toggle", uri)
    this.setState({
      videoUri: {uri},
    });
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

makeRemoteRequest = () => {
  const projectid = this.props.navigation.getParam('projectid', 0);
  console.log("projectid", projectid)
  const url = `http://crewcam.eecs.umich.edu/api/v1/${projectid}/videos/`;
  this.setState({ loading: true });

  fetch(url)
    .then(res => res.json())
    .then(res => {
      // console.log(res)
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
        <View style={{flex: 1, flexDirection: 'column'}}>
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
            keyExtractor={item => item.creatorid.toString()}
            numColumn={1}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}> 
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.pictureWrapper}>
              <Video
                style={styles.picture}
                source={ this.state.videoUri }
                useNativeControls
              />
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue'}} />
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
});
