import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Orientation from 'react-native-orientation';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };

     componentDidMount() {

    Orientation.lockToLandscape();
}

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}