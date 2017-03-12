import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Tinder from "./Tinder.js";
import LinkContainer from "./Link/LinkContainer.js";
import JubaView from "./JubaView.js";
import CommonContainer from "../common/CommonContainer";

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
  image:{
    width: 120,
    height: 120
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

  renderElement = (data) => {
    return <View>
      <Card>
        <Text>{data.title}</Text>
        <Text>{data.user.username}</Text>
        <Text>{data.user.avatar.avatar}</Text>
        {data.user.avatar.avatar === null ? null :
          <Image source={{uri: data.user.avatar.avatar}} style={styles.image}/>
        }
        {data.image === null ? null :
          <Image source={{uri: data.image}} style={styles.image}/>
        }
      </Card>
    </View>
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={styles.tabContainer}><LinkContainer /></View>;
      case '2':
        return <View style={[AppStyles.tabContainer]}>
                  <CommonContainer url={'http://192.168.31.189:8000/api/show/'} element={data => this.renderElement(data)} />
                </View>;
      case '3':
        return <JubaView />;
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
