import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Video, FaceDetector } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const pictureSize = 150;

export default class Photo extends React.Component {
  state = {
    selected: false,
    faces: [],
    image: null,
  };
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  toggleSelection = () => {
    this.setState(
      { selected: !this.state.selected },
      () => this.props.onSelectionToggle(this.props.uri, this.state.selected)
    );
  }


  render() {
    const { uri } = this.props;
    console.log("Photo", {uri})
    return (
        <TouchableOpacity
          style={styles.pictureWrapper}
          onPress={this.toggleSelection}
          activeOpacity={1}
        >
          <Video
            style={styles.picture}
            source={{ uri }}
            useNativeControls
          />
          {this.state.selected && <Ionicons name="md-checkmark-circle" size={30} color="#4630EB" />}
        </TouchableOpacity>
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
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 2,
    fontSize: 10,
    backgroundColor: 'transparent',
  }
});