import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScreenOrientation } from 'expo';

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
    return <ExpoConfigView />;
  }
}