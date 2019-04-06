import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Video, FaceDetector } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const pictureSize = 150;

export default class Vid extends React.Component {
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }


  render() {
    const { uri } = this.props;
    console.log("Photo", {uri})
    return (
      <Video
        style={styles.picture}
        source={{ uri }}
        useNativeControls
      />
    );
  };
}

const styles = StyleSheet.create({
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});
