/**
 * List of Recipes for a Meal Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
// import * as UserActions from '@redux/user/actions';

// Consts and Libs
import AppAPI from '@lib/api';
import { ErrorMessages } from '@constants/';

// Components
import Error from '@components/general/Error';
import Loading from '@components/general/Loading';
import RecipeListingRender from './ListingView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = () => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

/* Component ==================================================================== */
class MealListing extends Component {
  static componentName = 'MealListing';

  static propTypes = {
    meal: PropTypes.string.isRequired,
  }

  constructor() {
    super();

    this.state = {
      page: 1,
      loading: false,
      canLoadMoreContent: false,
      error: null,
      recipes: [],
      headers: [],
    };
  }

  componentDidMount = () => {
    this.fetchRecipes();
  };

  /**
    * Fetch Data from API
    */
  fetchRecipes = (options) => {
    const { meal } = this.props;
    if(options && options.reFetch) {
      this.setState({
        page: 1
      })
    }

    // Forgot to pass in a category?
    if (!meal) {
      this.setState({
        error: ErrorMessages.missingMealId,
      });
    }

    return AppAPI.recipes.get({ categories: meal, page: this.state.page })
      .then((res) => {
        let _canLoadMoreContent = false;
        if(res.headers.link && res.headers.link.length > 0) {
          let nextRegex = /rel="next"/g;
          if (nextRegex.test(res.headers.link)) {
            _canLoadMoreContent = true;
          }
        }
        this.setState({
          recipes: res.res,
          headers: res.headers,
          loading: false,
          canLoadMoreContent: _canLoadMoreContent,
          error: null,
        });
      }).catch((err) => {
        const error = AppAPI.handleError(err);

        this.setState({
          recipes: [],
          error,
          loading: false,
        });
      });
  };

  _loadMoreContentAsync = async () => {
    let page = this.state.page + 1;
    this.setState({
      page: page
    });

    if(this.state.loading === false) {
      this.fetchRecipes();
    }
  };

  render = () => {
    const { loading, error, recipes, canLoadMoreContent } = this.state;

    if (loading) return <Loading />;
    if (error) return <Error text={error} />;

    return (
      <RecipeListingRender
        recipes={recipes}
        canLoadMoreContent={canLoadMoreContent}
        onLoadMoreAsync={this._loadMoreContentAsync}
        reFetch={this.fetchRecipes}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListing);
