import React, {Component, PropTypes} from "react";
import {View, StyleSheet, InteractionManager} from "react-native";
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";
import {AppColors} from "@theme/";
import ListingContainer from "@containers/recipes/Listing/ListingContainer";
import {Text} from "@ui/";
import Loading from "@components/general/Loading";
import Error from "@components/general/Error";

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbarText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
class RecipeTabs extends Component {
  static componentName = 'RecipeTabs';

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      visitedRoutes: [],
    };
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setTabs();
    });
  };

  setTabs = () => {
    const routes = [
      {
        id: "143",
        key: "0",
        title: "极客爱情"
      },
      {

        id: "1",
        key: "1",
        title: "爱情攻略"
      }
    ];
    this.setState({
      navigation: {
        index: 0,
        routes,
      },
    }, () => {
      this.setState({
        loading: false,
      });
    });
  };


  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  };

  renderHeader = props => (
    <TabBarTop
      {...props}
      style={styles.tabbar}
      indicatorStyle={styles.tabbarIndicator}
      renderLabel={scene => (
        <Text style={[styles.tabbarText]}>{scene.route.title}</Text>
      )}
    />
  );


  renderScene = ({ route }) => {
    // For performance, only render if it's this route, or I've visited before
    if (
      parseInt(route.key, 0) !== parseInt(this.state.navigation.index, 0) &&
      this.state.visitedRoutes.indexOf(route.key) < 0
    ) {
      return null;
    }

    // And Add this index to visited routes
    if (this.state.visitedRoutes.indexOf(this.state.navigation.index) < 0) {
      this.state.visitedRoutes.push(route.key);
    }

    // Which component should be loaded?
    return (
      <View style={styles.tabContainer}>
        <ListingContainer
          meal={route.id}
        />
      </View>
    );
  }

  render = () => {
    if (this.state.loading || !this.state.navigation) return <Loading />;
    if (this.state.error) return <Error text={this.state.error} />;

    return (
      <TabViewAnimated
        style={[styles.tabContainer]}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        navigationState={this.state.navigation}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeTabs;
