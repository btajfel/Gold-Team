import React, {Component} from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { Permissions } from "expo";
import { Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon } from 'native-base';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class LibraryRender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // projectName: "project"
        };
      }


    handlePress = (name) => {
      const {navigate} = this.props.navigation;
      const title = name;
      Alert.alert(
        `${title}`,
          "",
      
        [
          {text: "Cancel", style: 'cancel'},
          {text: "View", onPress: () => console.log('View Video')},
          {text: 'Edit', onPress: () => navigate('Edit')}
        ]
      )
    };

    handleExportPressLibrary = async (vidName, projectid) => {
      const {navigate} = this.props.navigation;
      const title = vidName;
      Alert.alert(
        `${title}`,
          "Would you like to save to camra roll or share with friends?",
      
        [
          {text: "Save", onPress: () => console.log('Video exported to Camera Roll')},
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
          "Video Exported to Camera Roll",
      
        [
          {text: "OK", style: 'cancel'}
        ]
      )
    };

    render() {
        const rowData = this.props.item
        if (rowData.created){
        return (
            <ListItem onPress={() => this.handlePress(rowData.name)}>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text style={{fontWeight: "bold"}}>{rowData.name} </Text>
                    <Text Note>{rowData.created}</Text>
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
            <ListItem onPress={() => this.handlePress(rowData.name)}>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text style={{fontWeight: "bold"}}>{rowData.name} </Text>
                    <Text Note>{rowData.owner}</Text>
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