import React, {Component} from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon } from 'native-base'



export default class LibraryProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // projectName: "project"
        };
      }

    onPress = (index, item) => {
        Alert.alert(index, `You're pressing on ${item}`);
    };

    render() {
        const rowData = this.props.item
        return (
            <ListItem>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text>{rowData.name.first}</Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                    <View style={styles.editButton}>
                        <Button
                            small
                            transparent
                            title="view"
                            style={styles.editButton}
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
    editButton: {
    margin: 0,
    padding: 5
  }
});