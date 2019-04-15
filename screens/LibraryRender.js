import React, {Component} from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { Permissions, FileSystem, MediaLibrary } from "expo";
import { Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon } from 'native-base';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Vid from './Vid';

const VIDEOS_DIR = FileSystem.documentDirectory + 'videos';

export default class LibraryRender extends Component {

    constructor(props) {
      super(props);
      this.state = {
          // projectName: "project"
      };
    }


    handlePressSave = async (projectid) => {
      const {navigate} = this.props.navigation;
      console.log("View")

      fetch(`http://crewcam.eecs.umich.edu/api/v1/${projectid}/render/name/`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(async (data) => {
        const filename = data.filename;

        if (filename !== undefined) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

          if (status !== 'granted') {
            throw new Error('Denied CAMERA_ROLL permissions!');
          }

          
          await MediaLibrary.createAssetAsync(`${VIDEOS_DIR}/${filename}`);

          // await Promise.all(promises);
          alert('Successfully saved final video to user\'s gallery!');
        } else {
          alert('Final Video not created!');
        }
      })
      .catch(e => {
        console.log(e);
      })

    };


    handlePressView = (projectid) => {
      const {navigate} = this.props.navigation;
      console.log("View")

      fetch(`http://crewcam.eecs.umich.edu/api/v1/${projectid}/render/name/`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(data => {
        const filename = data.filename;

        navigate('View', {uri: filename, projectid: projectid});
      })
      .catch(e => {
        console.log(e);
      })
    };

    handlePressLibrary = (projectData) => {
      const {navigate} = this.props.navigation;
      const title = projectData.name;
      Alert.alert(
        `${title}`,
          "",
      
        [
          {text: "Cancel", style: 'cancel'},
          {text: "View", onPress: () => this.handlePressView(projectData.projectid)},
          {text: 'Edit', onPress: () => navigate('Edit', {projectid: projectData.projectid, name: projectData.name})},
          {text: 'Settings', onPress: () => navigate('Settings', {projectid: projectData.projectid})},
        ]
      )
    };

    handlePressShared = (projectData) => {
      const {navigate} = this.props.navigation;
      const title = projectData.name;
      Alert.alert(
        `${title}`,
          "",
      
        [
          {text: "Cancel", style: 'cancel'},
          {text: "View", onPress: () => this.handlePressView(projectData.projectid)}
        ]
      )
    };

    handleExportPressLibrary = async (vidName, projectid) => {
      const {navigate} = this.props.navigation;
      const title = vidName;
      Alert.alert(
        `${title}`,
          "Would you like to save to Camera Roll or Share With Friends?",
      
        [
          {text: "Cancel", style: 'cancel'},
          {text: "Save", onPress: () => this.handlePressSave(projectid)},
          {text: "Share", onPress: () => navigate('Share', {pid: projectid})}
        ]
      )
      //   if (photos.length > 0) {
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

      handleExportPressShared = async (vidName) => {
      const title = vidName;
      Alert.alert(
        `${title}`,
          "Would you like to save to Camera Roll?",
      
        [
          {text: "Cancel", style: 'cancel'},
          {text: "Save", onPress: () => this.handlePressSave(projectid)}
        ]
      )
    };

    render() {
        const rowData = this.props.item
        if (rowData.created){
          const dateString = rowData.created;
          const year = dateString.substring(0,4);
          const day = dateString.substring(5,7);
          const month = dateString.substring(8,10);
          const date = day + "/" + month + "/" + year;
        return (
            <ListItem onPress={() => this.handlePressLibrary(rowData)}>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text style={{fontWeight: "bold"}}>{rowData.name} </Text>
                    <Text Note>Created: {date}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                    <View style={styles.exportButton}>
                        <Button
                            small
                            transparent
                            title="view"
                            onPress =  {() => this.handleExportPressLibrary(rowData.name, rowData.projectid)}
                            style={styles.exportButton}
                        >
                            <Icon name="download" color="blue" />
                        </Button>
                    </View>
                </Right>
            </ListItem>
        );
    }
    else{
      return (
            <ListItem onPress={() => this.handlePressShared(rowData)}>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text style={{fontWeight: "bold"}}>{rowData.name} </Text>
                    <Text Note>Owner: {rowData.owner}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                    <View style={styles.exportButton}>
                        <Button
                            small
                            transparent
                            title="view"
                            onPress={() => this.handleExportPressShared(rowData.name)}
                            style={styles.exportButton}
                        >
                            <Icon name="download" color="blue" />
                        </Button>
                    </View>
                </Right>
            </ListItem>
        );

    }
  }
}

const styles = StyleSheet.create({
    exportButton: {
    margin: 0,
    padding: 5
  }
});
