
    
import React, { PureComponent } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon } from 'native-base'


 const button = {
    off: 'ios-checkbox-outline',
    on: 'ios-checkbox'
  };

export default class ContactRender extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      inviteIcon: 'off'
    };
  }

    
  onPressItem = (type, item) => {
    this.setState({ inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off'});
  };


  render() {
    const invButton = button[this.state.inviteIcon]
    const rowData = this.props.item
    const phoneNumber = "phoneNumbers" in rowData ? rowData.phoneNumbers[0].digits : ''
    return (
      <ListItem>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{rowData.name}</Text>
          <Text Note>{phoneNumber}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <View style={styles.rightBtn}>
            <Button
              small
              transparent
              title="view"
              onPress={() => this.onPressItem('invite', rowData.cell)}
              style={styles.rightBtn}
            >
              <Icon name={invButton} style={styles.rightBtnIcon} />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
    rightBtn: {
    margin: 0,
    padding: 5
  }
});