import React, {Component} from "react";
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation } from 'expo';
import { AppRegistry, View, FlatList, Text } from 'react-native';
import { Row } from 'native-base';
import EditScreenVideo from './EditScreenVideo'

export default class EditScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
        data: [],
        error: null,
        loading: false,
        index: 0
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
  const url = `http://crewcam.eecs.umich.edu/api/v1/projects/`;
  this.setState({ loading: true });

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        data: res.projects,
        error: res.error || null,
        loading: false,
      });
      this.arrayholder = res.results;
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
};


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FlatList
            ref={(ref) => this.listView = ref}
            data = {this.state.data}
            renderItem={({ item }) => (
              <EditScreenVideo item={item}/>
            )}
            onFetch={this.onFetch}
            keyExtractor={item => item.name}
            numColumn={1}
          />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
        <View style={{flex: 1, backgroundColor: 'black'}} />
      </View>

    );


  }
}