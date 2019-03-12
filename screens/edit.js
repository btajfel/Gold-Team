import React from 'react';


export default class EditScreen extends React.Component {
    state = {
      contact: []
    };
  
    componentDidMount(){
    this.getContacts();
  };

  static navigationOptions = {
    title: 'EditScreen'
  };
  
  renderItem({item, index}) {
    const number = item.phoneNumber.map((val, key) => {if(key === 0) return val.number});
    return(
      <View> 
      <Text> {item.givenName} {item.familyName} {number} </Text>
      </View>
      );
  };

  render() {
    var {navigate} = this.props.navigation;
    return (
      <Flatlist
      data = {this.state.contact}
      renderItem = {(a) => this.renderItem(a)}
      keyExtractor = {(item, index) => index.toString()}
      />
      );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});