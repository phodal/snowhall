import React, {Component} from "react";
import {View, Alert, ListView, Linking, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Loading from '@components/general/Loading';

import InfiniteScrollView from 'react-native-infinite-scroll-view';

const styles = StyleSheet.create({});

class JubaView extends Component {
  static componentName = 'JubaView';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jubas: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true,
      canLoadMoreContent: false
    });

    fetch('https://phodal.github.io/mockfall/juba/api.json', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => { // responseData = undefined
        console.log("================== loaded data ================");
        console.log(responseData);

        this.setState({
          loading: false,
          jubas: responseData.results,
          dataSource: this.updatedDataSource(responseData.results),
        });

        if (!responseData.next) {
          this.setState({
            canLoadMoreContent: true
          })
        }
      })
  }

  updatedDataSource(data) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = data;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  onLoadMoreAsync = () => {
    this.setState({isLoadMoreAsync: true});
  };

  onPress(url) {
    // Linking.openURL(url);
    Actions.webView({
      onNavigationStateChange: () => {},
      url: url
    });
  }

  render = () => {
    if (this.state.loading) {
      return <Loading />
    }
    const { dataSource, canLoadMoreContent } = this.state;

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}>
        <ListView
          initialListSize={10}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderRow={juba =>
            <TouchableOpacity activeOpacity={0.9}>
            <Card>
              <View>
                <Text>{juba.date}</Text>
                <Text>{juba.title}</Text>
                <Text>{juba.description}</Text>
                <Text>{juba.content}</Text>
                <Text>{juba.user}</Text>
              </View>
            </Card>
            </TouchableOpacity>
          }
          dataSource={dataSource}
          canLoadMore={canLoadMoreContent}
          onLoadMoreAsync={this.onLoadMoreAsync}
        />

      </ScrollView>
    )
  };
}

export default JubaView;
