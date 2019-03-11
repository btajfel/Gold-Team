import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {ListItem, List, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


  const button = {
    off: 'ios-checkbox-outline',
    on: 'ios-checkbox'
  };

export default class renderContact extends React.Component {

componentDidMount() {
    const { nav } = this.props;

    nav.onNavigateShouldAllow(() => {
       return true;
    });
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

    state = {
        inviteIcon: 'off'
    };



 _onPressButton = (item) => {
   //console.log(item);

    this.setState({ inviteIcon: this.state.inviteIcon === 'off' ? 'on' : 'off'});
    /*
    this.state.inviteList.push({
      id: item.phoneNumber
    })
    */
}

 renderItem = ({item}) => {
  const iname = button[this.state.inviteIcon];
  console.log(iname);
    return(
        <View>
        <ListItem
        title = {item.fullName} 
        subtitle = {item.phoneNumber}
        onPress={() => { console.log(item.fullName) } }
        key={item}
        rightIcon={
            <Ionicons
            onPress = {() => this._onPressButton(item)}
            name = {iname}
         />
     }
     />
     </View>
     )
}

render(){
	const row = this.renderItem(this.props.data);
	return(
		{row}
		);
}
};