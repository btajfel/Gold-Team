import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import PropTypes from 'prop-types';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: [],
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

// CHANGE THIS FUNCTION
  saveToGallery = async () => {
    const video = this.state.selected[0];
    // const type = 'video/mov';
    // photos.map(photo => {
    const form = new FormData();
    // form.append("name", "\"video-upload\"");
    // form.append("type", type);

    // const myheaders = new Headers();
    // myheaders.append('content-type', 'undefined')
    // myheaders.append('cache-control', 'no-cache');

    form.append('file', {
      uri: video,
      type: 'video/mov', // or photo.type
      name: 'test'
    });
    console.log(video)
    // FIXME (projectid)
    const url = 'http://crewcam.eecs.umich.edu/api/v1/3/save/';
    try {
      const response = await fetch(url, {
        method: 'POST',
        // headers: myheaders,
        body: form,
      });
      alert('Videos Saved to Project');
      console.log(response)
    } catch (e) {
      console.error(e)
    }

    /*   OLD CODE ////
    form.append('file', photos);
    console.log(photos)
    // FIXME (projectid)
    const url = 'http://crewcam.eecs.umich.edu/api/v1/3/save/';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: form
      });
      alert('Videos Saved to Project');
      console.log(response)
    } catch (e) {
      console.error(e)
    }
    */ ///////// OLD CODE
        // });
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //   if (status !== 'granted') {
    //     throw new Error('Denied CAMERA_ROLL permissions!');
    //   }

    //   const promises = photos.map(photoUri => {
    //     return MediaLibrary.createAssetAsync(photoUri);
    //   });

    //   await Promise.all(promises);
    //   alert('Successfully saved photos to user\'s gallery!');
    // } else {
    //   alert('No photos to save!');
    // }
  };



  DeleteVideo = async () => {
    const photos = this.state.selected;
    const remaining = this.state.photos;
    photos.map(async (photo) => {
      FileSystem.deleteAsync(photo);
      remaining = remaining.filter(item => item != photo )
    })
    this.setState({
      photos: remaining,
    })

    console.log("Videos Deleted");
};



  renderPhoto = fileName =>
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.DeleteVideo}>
            <Text style={styles.whiteText}>Delete Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Upload To Project</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  }
});
