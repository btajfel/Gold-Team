import React, {Component} from "react";
import { Alert, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button, ListItem, Left, Right, Body, Thumbnail, Icon } from 'native-base';


export default class EditScreenVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // projectName: "project"
        };
      }

    handlePress  = (name) => {

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
                </Right>
            </ListItem>
        );
    }
}