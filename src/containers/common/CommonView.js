import React, {Component, PropTypes} from "react";
import {
  View,
  Alert,
  ListView,
  RefreshControl,
  Linking,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Card} from "@components/ui/";
import {ErrorMessages} from "@constants/";
import InfiniteScrollView from "react-native-infinite-scroll-view";
import Error from "@components/general/Error";


class CommonView extends Component {
  static componentName = 'CommonView';

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    canLoadMoreContent: PropTypes.bool,
    onLoadMoreAsync: PropTypes.func,
    reFetch: PropTypes.func,
    dataUrl: PropTypes.string
  };

  constructor() {
    super();

    this.state = {
      isRefreshing: true,
      canLoadMoreContent: false,
      isLoadMoreAsync: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      dataSource: this.getUpdatedDataSource(props),
      canLoadMoreContent: props.canLoadMoreContent,
      dataUrl: props.dataUrl,
      isRefreshing: false
    });
  }

  componentWillMount(){
    //TODO: check componentWillReceiveProps problem
    if(this.props.data.length > 0 && this.state.dataSource.getRowCount() < 1) {
      this.setState({
        dataSource: this.getUpdatedDataSource(this.props),
        canLoadMoreContent: this.props.canLoadMoreContent,
        dataUrl: this.props.dataUrl,
        isRefreshing: false
      });
    }
  }

  getUpdatedDataSource(props) {
    let rows = props.data;
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

  reFetch = () => {
    if (this.props.reFetch) {
      this.setState({ isRefreshing: true });

      this.props.reFetch({dataUrl: this.state.dataUrl})
        .then(() => {
          this.setState({ isRefreshing: false });
        });
    }
  };


  render = () => {
    const {data} = this.props;
    const {isRefreshing, dataSource, canLoadMoreContent} = this.state;

    if (!isRefreshing && (!data || data.length < 1)) {
      return <Error text={ErrorMessages.links404}/>;
    }

    return (
      <View>
        <ListView
          initialListSize={10}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderRow={this.props.element}
          dataSource={dataSource}
          canLoadMore={canLoadMoreContent}
          onLoadMoreAsync={this.onLoadMoreAsync}
          refreshControl={
            this.props.reFetch ?
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.reFetch}
                tintColor={AppColors.brand.primary}
              />
            : null
          }
        />

      </View>
    )
  };
}

export default CommonView;
