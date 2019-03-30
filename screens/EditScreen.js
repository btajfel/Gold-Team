import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation } from 'expo';
import { AppRegistry, View, FlatList } from 'react-native';
import { Row } from 'native-base';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };


     componentDidMount() {

     ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
}
  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
        <FlatList/>
      </View>

    );


  }
}