import React, {Component} from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { Permissions } from "expo";
import { Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon } from 'native-base'



export default class LibraryProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // projectName: "project"
        };
      }

      handlePress = (name) => {
      const title = name;
      Alert.alert(
      `${title}`,
        "",
    
    [
    {text: "Cancel", style: 'cancel'},
    {text: "View", onPress: () => console.log('View Video')},
    {text: 'Edit', onPress: () => console.log('Edit Video')}
    ]
    )
    };

    handleExportPress = async () => {
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
      alert('Video exported to Camera Roll')
    };

    render() {
        const rowData = this.props.item
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
                            onPress={this.handleExportPress}
                            style={styles.exportButton}
                        >
                            <Icon name="download" />
                        </Button>
                    </View>
                </Right>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    exportButton: {
    margin: 0,
    padding: 5
  }
});