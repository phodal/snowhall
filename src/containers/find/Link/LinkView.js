import React, {Component, PropTypes} from "react";
import {View, Alert, ListView, Linking, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import { ErrorMessages } from '@constants/';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Error from '@components/general/Error';
import LinkCard from "./LinkCard";

const styles = StyleSheet.create({});

class LinkView extends Component {
  static componentName = 'LinkView';

  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
    canLoadMoreContent: PropTypes.bool,
    onLoadMoreAsync: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      canLoadMoreContent: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      dataSource: this.getUpdatedDataSource(props),
      canLoadMoreContent: props.canLoadMoreContent
    });
  }

  getUpdatedDataSource(props) {
    let rows = props.links;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  onLoadMoreAsync = () => {
    this.setState({isLoadMoreAsync: true});
    this.props.onLoadMoreAsync()
      .then(() => {
        this.setState({isLoadMoreAsync: false});
      });
  };

  render = () => {
    const { links } = this.props;
    const { dataSource, canLoadMoreContent } = this.state;

    if (!links || links.length < 1) {
      return <Error text={ErrorMessages.links404} />;
    }

    return (
      <View style={[AppStyles.container]}>
        <ListView
          initialListSize={10}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderRow={link => <LinkCard link={link} />}
          dataSource={dataSource}
          canLoadMore={canLoadMoreContent}
          onLoadMoreAsync={this.onLoadMoreAsync}
        />

      </View>
    )
  };
}

export default LinkView;
