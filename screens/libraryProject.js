import React, {Component} from "react";
import {StyleSheet, View, Alert, Text, TouchableOpacity} from "react-native";
import {UltimateListView} from "react-native-ultimate-listview";
import { ListItem } from "react-native-elements";


export default class library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // projectName: "project"
        };
      }

    renderItem = (item, index, separator) => {
        <FlatListItem item={item} index={index} onPress={this.onPressItem} />
        return null
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
                            // onPress={() => this.onPressItem('invite', rowData.cell)}
                            style={styles.editButton}
                        >
                            <Icon name={editButton} style={styles.editButton} />
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