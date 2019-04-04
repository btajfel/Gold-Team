import React, {Component} from "react";
import { Alert, View, Text, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import LibraryRender from './LibraryRender'

export default class LibraryScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            error: null,
            loading: false,
            index: 0
        };
        this.arrayholder = [];
      }

    sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            //This is required to determinate whether the first loading list is all loaded.
            let pageLimit = 24;
            if (this.state.layout === 'grid') pageLimit = 60;
            let skip = (page - 1) * pageLimit;

            // startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    componentDidMount() {
      this.makeRemoteRequest();
    }
  
    makeRemoteRequest = async () => {
      const username = await AsyncStorage.getItem("userToken")
      const url = `http://crewcam.eecs.umich.edu/api/v1/${username}/projects/`;
      this.setState({ loading: true });
  
      fetch(url)
        .then((res) => res.json())
        .then(res => {
        	// console.log(res)
          this.setState({
            data: res.projects,
            error: res.error || null,
            loading: false,
          });
          this.arrayholder = res.projects;
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    };

    // renderItem = (item, index, separator) => {
    //     return <FlatListItem item={item} index={index} onPress={this.onPressItem} />
    //   }

    onPress = (index, item) => {
        Alert.alert(index, `You're pressing on ${item}`);
    };

    renderHeaderView = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };

      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
            }}
          />
        );
      };

    render() {
      if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
        return (
          <FlatList
            ref={(ref) => this.listView = ref}
            data = {this.state.data}
            renderItem={({ item }) => (
              <LibraryRender item={item} navigation={this.props.navigation}/>
            )}
            onFetch={this.onFetch}
            keyExtractor={item => item.name}
            // keyExtractor={(item, index) => `${this.state.layout} - ${item}`}  //this is required when you are using FlatList
            refreshableMode="advanced" //basic or advanced
            // item={this.renderItem}  //this takes two params (item, index)
            numColumn={1} //to use grid layout, simply set gridColumn > 
            
             //----Extra Config----
             header={this.renderHeaderView}
             ItemSeparatorComponent={this.renderSeparator}
            //  paginationFetchingView={this.renderPaginationFetchingView}           
            //  paginationFetchingView={this.renderPaginationFetchingView}
            //  paginationAllLoadedView={this.renderPaginationAllLoadedView}
            //  paginationWaitingView={this.renderPaginationWaitingView}
            //  emptyView={this.renderEmptyView}
            //  separator={this.renderSeparatorView}
           />
        );
    }
}