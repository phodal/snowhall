import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Tinder from "./Tinder.js";
import LinkView from "./LinkView.js";

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

class FindView extends Component {
  static componentName = 'FindView';
  state = {
    index: 0,
    routes: [
      { key: '1', title: '头条' },
      { key: '2', title: '妹子' },
      { key: '3', title: '聚会' },
    ],
  };

  constructor(props) {
    super(props);
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop
      {...props}
      style={styles.tabbar}
      indicatorStyle={styles.tabbarIndicator}
      renderLabel={scene => (
        <Text style={[styles.tabbarText]}>{scene.route.title}</Text>
      )}
    />
      ;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <LinkView />;
      case '2':
        return <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}><Tinder style={{flex: 1}}/></ScrollView>;
      case '3':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      default:
        return null;
    }
  };

  render = () => (
    <TabViewAnimated
      style={styles.tabContainer}
      navigationState={this.state}
      renderScene={this._renderScene}
      renderHeader={this._renderHeader}
      onRequestChangeTab={this._handleChangeTab}
    />
  );
}

export default FindView;
