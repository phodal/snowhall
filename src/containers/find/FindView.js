import React, {Component} from "react";
import {View, Linking, Alert, ListView, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import JubaView from "./JubaView.js";
import CommonContainer from "../common/CommonContainer";
import moment from "moment";

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  headerContainer: {
    flex:1,
  },
  headerTitle:{
    fontSize: 20,
    textAlign: 'left',
    color: '#FF6600',
  },
  headerSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
  },
  headerPostDetailsLine: {
    fontSize: 12,
    color: 'gray',
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

  onPress(url) {
    Linking.openURL(url);
  }

  renderProfileElement = (data) => {
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

  renderLinkProfileElement = (link) => {
    return <TouchableOpacity onPress={this.onPress.bind(this, link.link)}>
      <Card>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            {link.title}
          </Text>
          <Text style={styles.headerPostDetailsLine}>
            {moment(link.date).fromNow()}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={[AppStyles.tabContainer]}>
          <CommonContainer url={'http://192.168.31.170:8000/api/link/'} element={data => this.renderLinkProfileElement(data)} />
        </View>;
      case '2':
        return <View style={[AppStyles.tabContainer]}>
                  <CommonContainer url={'http://192.168.31.170:8000/api/show/'} element={data => this.renderProfileElement(data)} />
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
