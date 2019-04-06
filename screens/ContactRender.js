import React, { PureComponent } from 'react'
import { StyleSheet, View, Alert} from 'react-native'
import { Button, ListItem, Left, Right, Body, Text, Icon } from 'native-base'


 const button = {
    off: '',
    on: 'ios-checkmark'
  };

export default class ContactRender extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      inviteIcon: 'off',
      selected: false,
    };
  }


   toggleSelection = (item) => {
    this.setState(
      { selected: !this.state.selected,
        inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off',
       },
      () => this.props.onSelectionToggle(item.username, this.state.selected)
    );
  }

  render() {
    const invButton = button[this.state.inviteIcon]
    const rowData = this.props.item
     return (
      <ListItem onPress={() => this.toggleSelection(rowData)}>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{rowData.fullname}</Text>
          <Text Note>{rowData.phonenumber}</Text>
        </Body>
        {rowData.distance && <Text style={{ textAlign: 'right', paddingRight: 10 }}>{rowData.distance} miles </Text>}
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
    paddingRight: 5
  }
});
