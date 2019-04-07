import React, {Component} from "react";
import {FileSystem} from 'expo';
import { StyleSheet, Alert, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button, ListItem, Left, Right, Body, Thumbnail, Icon } from 'native-base';


const button = {
    off: '',
    on: 'ios-checkmark'
  };

const VIDEOS_DIR = FileSystem.documentDirectory + 'videos';

export default class EditRender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          inviteIcon: 'off',
          selected: false,
          videoFilename: '',
        };
    }

    componentDidMount() {
        this.getVideo();
    }

    getVideo = async () => {
        const filename = this.props.item.filename

        FileSystem.downloadAsync(
          `http://crewcam.eecs.umich.edu/api/v1/${filename}/video/`,
          `${VIDEOS_DIR}/${filename}`
        )
        .then(({ uri }) => {
            this.setState({ 
                videoFilename: uri
            });
        })
        .catch(error => {
        console.error(error);
        });
    }

    toggleSelection = (item) => {
        this.setState({ 
            selected: !this.state.selected,
            inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off',
           },
          () => this.props.onSelectionToggle(this.state.videoFilename)
        );
    }

    render() {
        const invButton = button[this.state.inviteIcon]
        const rowData = this.props.item
        return (
          <ListItem onPress={() => this.toggleSelection(rowData)}>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>{rowData.trackname}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <View style={styles.rightBtn}>
                <Button
                  transparent
                  title="view"
                  style={styles.rightBtn}
                >
                  {this.state.inviteIcon === "on" && <Icon name={invButton} style={{fontSize: 30, color: 'blue'}}/>}
                </Button>
              </View>
            </Right>
          </ListItem>
        );
      }
}


const styles = StyleSheet.create({
    rightBtn: {
    margin: 0,
    padding: 5
  }
});

