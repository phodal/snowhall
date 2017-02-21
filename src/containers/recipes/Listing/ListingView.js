/**
 * Recipe Listing Screen
 *  - Shows a list of receipes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  RefreshControl,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';
import { ErrorMessages } from '@constants/';

// Containers
import RecipeCard from '@containers/recipes/Card/CardContainer';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

// Components
import Error from '@components/general/Error';

/* Component ==================================================================== */
class RecipeListing extends Component {
  static componentName = 'RecipeListing';

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    canLoadMoreContent: PropTypes.bool,
    onLoadMoreAsync: PropTypes.func,
    reFetch: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      isRefreshing: true,
      canLoadMoreContent: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.recipes),
      canLoadMoreContent: props.canLoadMoreContent,
      isRefreshing: false,
    });
  }

  /**
    * Refetch Data (Pull to Refresh)
    */
  reFetch = () => {
    if (this.props.reFetch) {
      this.setState({ isRefreshing: true });

      this.props.reFetch({ reFetch: true })
        .then(() => {
          this.setState({ isRefreshing: false });
        });
    }
  };

  onLoadMoreAsync = () => {
    this.setState({isLoadMoreAsync: true});

    this.props.onLoadMoreAsync()
      .then(() => {
        this.setState({isLoadMoreAsync: false});
      });
  };

  render = () => {
    const { recipes } = this.props;
    const { isRefreshing, dataSource, canLoadMoreContent } = this.state;

    if (!isRefreshing && (!recipes || recipes.length < 1)) {
      return <Error text={ErrorMessages.recipe404} />;
    }

    return (
      <View style={[AppStyles.container]}>
        <ListView
          initialListSize={10}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderRow={recipe => <RecipeCard recipe={recipe} />}
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
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeListing;
