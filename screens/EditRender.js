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
          // inviteIcon: 'off',
          // selected: false,
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
    };

    deleteVideo = (videoId) => {
      fetch(`http://crewcam.eecs.umich.edu/api/v1/${videoId}/video/`, 
        { method: 'DELETE' })
        .then(() => {
          this.props.onDelete();
        })
        .catch(error => console.log(error));
    }

    toggleSelection = (item) => {
        // this.setState({ 
        //     selected: !this.state.selected,
        //     inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off',
        //    },
        // );
        this.props.onSelectionToggle(this.state.videoFilename, item.videoid);
    }

    render() {
        const rowData = this.props.item
        const startDate = new Date(rowData.starttime)
        const endDate = new Date(rowData.endtime);
        const endSeconds = startDate.getSeconds() + rowData.duration;

        const startTime = `${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`;
        const endTime = `${endDate.getHours()}:${endDate.getMinutes()}:${endSeconds}`;
        return (
          <ListItem onPress={() => this.toggleSelection(rowData)}>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>{rowData.trackname}</Text>
            </Body>
            <Text style={{ textAlign: 'right', paddingRight: 5 }}>Start: {startTime}{"\n"}End: {endTime}</Text>
            <Right style={{ borderBottomWidth: 0 }}>
              <View style={styles.exportButton}>
                <Button
                    small
                    transparent
                    title="delete"
                    onPress =  {() => this.deleteVideo(rowData.videoid)}
                >
                  <Icon name="trash" color="red" />
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

