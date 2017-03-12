import React, {Component, PropTypes} from "react";
import {View, Alert, ListView, Linking, Text, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Card} from "@components/ui/";
import {ErrorMessages} from '@constants/';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Error from '@components/general/Error';

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

  onPress(url) {
    Linking.openURL(url);
  }

  render = () => {
    const {links} = this.props;
    const {dataSource, canLoadMoreContent} = this.state;

    if (!links || links.length < 1) {
      return <Error text={ErrorMessages.links404}/>;
    }

    console.log(links);

    return (
      <View>
        <View>
          {links.map(function(link, i){
            return <Text key={i}>{link.title}</Text>;
          })}
        </View>

        <ListView
          initialListSize={10}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderRow={link => <TouchableOpacity onPress={this.onPress.bind(this, link.link)}>
            <Card>
              <View>
                <Text>{link.title}</Text>
              </View>
            </Card>
            </TouchableOpacity>}
          dataSource={dataSource}
          canLoadMore={canLoadMoreContent}
          onLoadMoreAsync={this.onLoadMoreAsync}
          refreshControl={null}
        />

      </View>
    )
  };
}

export default LinkView;
