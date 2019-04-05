import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, AlertIOS } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';
import Photo from './Photo';
import PropTypes from 'prop-types';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: [],
    isDialogVisible: false,
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

  getVideoName = () => {
    console.log("getVideoName")
    return new Promise((resolve, reject) => {
      AlertIOS.prompt('Name your video', null, (text) =>
         [
          {
            text: 'Cancel',
            onPress: () => reject(new Error('cancel')),
          },
          {
            text: 'OK',
            onPress: (text) => resolve(text),
          },
        ],
      );
    });

  };

// CHANGE THIS FUNCTION
  saveToGallery = async () => {
    let videoName = '';
    try {
      this.state.isDialogVisible = true;
      <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Name your video"}
            message={""}
            hintInput ={""}
            submitInput={ (inputText) => {videoName = inputText} }
            closeDialog={ () => {this.showDialog(false)}}>
      </DialogInput>

      console.log("Got video name");
    } catch(err) {
      console.log(err);
    }
    
    console.log("Got video name")
    const video = this.state.selected[0];

    const form = new FormData();

    form.append('file', {
      uri: video,
      type: 'video/mov', // or photo.type
      name: video
    });
    form.append('name', videoName)
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
  };



  DeleteVideo = async () => {
    const photos = this.state.selected;
    let remaining = this.state.photos;
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
