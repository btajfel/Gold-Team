import React, {Component} from "react";
import {StyleSheet, View, Alert, Text, TouchableOpacity} from "react-native";
import {UltimateListView} from "react-native-ultimate-listview";

export default class Example extends Component {

    sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            //This is required to determinate whether the first loading list is all loaded.
            let pageLimit = 24;
            if (this.state.layout === 'grid') pageLimit = 60;
            let skip = (page - 1) * pageLimit;

            //Generate dummy data
            let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`);

            //Simulate the end of the list if there is no more data returned from the server
            if (page === 10) {
                rowData = [];
            }

            //Simulate the network loading in ES7 syntax (async/await)
            await this.sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }     
    };

    renderItem = (item, index, separator) => {
        //write your own layout in list view
    };

    onPress = (index, item) => {
        Alert.alert(index, `You're pressing on ${item}`);
    };

    render() {
        return (           
          <UltimateListView
              ref={(ref) => this.listView = ref}             
              onFetch={this.onFetch}
              keyExtractor={(item, index) => `${this.state.layout} - ${item}`}  //this is required when you are using FlatList
              refreshableMode="advanced" //basic or advanced
              item={this.renderItem}  //this takes two params (item, index)
              numColumn={1} //to use grid layout, simply set gridColumn > 1

             //----Extra Config----
             header={this.renderHeaderView}
             paginationFetchingView={this.renderPaginationFetchingView}
             paginationFetchingView={this.renderPaginationFetchingView}
             paginationAllLoadedView={this.renderPaginationAllLoadedView}
             paginationWaitingView={this.renderPaginationWaitingView}
             emptyView={this.renderEmptyView}
             separator={this.renderSeparatorView}
           />
        );
    }
}
