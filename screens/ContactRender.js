
    
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
      inviteIcon: 'off'
    };
  }

    
  onPressItem = (type, item) => {
    this.setState({ inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off'});
  };


  render() {
    const invButton = button[this.state.inviteIcon]
    const rowData = this.props.item
    //const phoneNumber = "phoneNumbers" in rowData ? rowData.phoneNumbers[0].digits : ''
    return (
      <ListItem onPress={() => this.onPressItem('invite', rowData.cell)}>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{rowData.fullname}</Text>
          <Text Note>{rowData.phonenumber}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <View style={styles.rightBtn}>
            <Button
              transparent
              title="view"
              style={styles.rightBtn}
            >
              <Icon name={invButton} style={{fontSize: 30, color: 'blue'}}/>
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