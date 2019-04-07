import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, TextInput, ScrollView, AsyncStorage } from 'react-native';
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
    text: '',
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
    // console.log("Gallery photos", photos)
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

  // getVideoName = () => {
  //   console.log("getVideoName")
  //   return new Promise((resolve, reject) => {
  //     AlertIOS.prompt('Name your video', null, (text) =>
  //        [
  //         {
  //           text: 'Cancel',
  //           onPress: () => reject(new Error('cancel')),
  //         },
  //         {
  //           text: 'OK',
  //           onPress: (text) => resolve(text),
  //         },
  //       ],
  //     );
  //   });
  // };

// CHANGE THIS FUNCTION
  saveToGallery = async () => {
    const username = await AsyncStorage.getItem("userToken");
    let projectid = this.props.projectId;
    if (projectid === 0) {
      fetch(`http://crewcam.eecs.umich.edu/api/v1/${username}/projects/`, {
            method: 'POST',
            body: JSON.stringify({
               projectId: projectid,
            })
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText);
          return res.json()
        })
        .then(data => {
          projectid = data.projectid;
          console.log("pid", data.projectid)
        })
        .then(() => {
          const video = this.state.selected[0];
          const videoName = this.state.text;

          const split = video.split("/");
          const videoTimes = split[split.length - 1]

          const startTime = videoTimes.split("-")[0]
          const endTime = videoTimes.split("-")[1].split(".")[0]

          const form = new FormData();

          form.append('file', {
            uri: video,
            type: 'video/mov', // or photo.type
            name: 'file.mov'
          });
          form.append('name', videoName);
          form.append('startTime', startTime);
          form.append('endTime', endTime);
          form.append('username', username);
          // console.log(video)
          // FIXME (projectid)
          console.log("pid 2", projectid)
          const url = `http://crewcam.eecs.umich.edu/api/v1/${projectid}/save/`;
          fetch(url, {
            method: 'POST',
            body: form,
          })
            .then((res) => {
              if (!res.ok) throw Error(res.statusText);
              alert('Video Saved to Project');
              // console.log(res)
            })
            .catch(error => {
              alert('Video Could Not be Saved');
              console.log(error)
            });
        })
        .catch(error => {
          console.log(error)
        });
    }
    else {
      const video = this.state.selected[0];
      const videoName = this.state.text;

      const split = video.split("/");
      const videoTimes = split[split.length - 1]

      const startTime = videoTimes.split("-")[0]
      const endTime = videoTimes.split("-")[1].split(".")[0]

      const form = new FormData();

      form.append('file', {
        uri: video,
        type: 'video/mov', // or photo.type
        name: 'file.mov'
      });
      form.append('name', videoName);
      form.append('startTime', startTime);
      form.append('endTime', endTime);
      form.append('username', username);
      // console.log(video)
      // FIXME (projectid)
      console.log("pid 2", projectid)
      const url = `http://crewcam.eecs.umich.edu/api/v1/${projectid}/save/`;
      fetch(url, {
        method: 'POST',
        body: form,
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText);
          alert('Video Saved to Project');
          // console.log(res)
        })
        .catch(error => {
          alert('Video Could Not be Saved');
          console.log(error)
        });
    }
  };


  DeleteVideo = async () => {
    const photos = this.state.selected;
    let selected = this.state.selected;
    let remaining = this.state.photos;
    photos.map(async (photo) => {
      await FileSystem.deleteAsync(photo);
      let split = photo.split("/");
      remaining = remaining.filter(item => item != split[split.length - 1] )
      selected = selected.filter(item => item != photo )
    })
    this.setState({
      photos: remaining,
      selected: selected,
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
    // console.log("selected", this.state.selected)
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
        <View style={{ paddingLeft: 20 }}>
          <TextInput
            style={{height: 40}}
            placeholder="Name your track"
            onChangeText={(text) => this.setState({text})}
          />
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
