import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { AppColors, AppStyles } from '@theme/';

import {
  Alerts,
  Button,
  Card,
  Spacer,
  Text,
  List,
  ListItem,
  FormInput,
  FormLabel,
} from '@components/ui/';

import ParsedText from 'react-native-parsed-text'
import GiftedListView from 'react-native-gifted-listview'

const styles = StyleSheet.create({
  paginationView: {
    backgroundColor: '#efeff4'
  },
  url: {
    color: '#007aff'
  },
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbar_text: {
    color: '#FFF',
  },

  tweetContainer: {
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 0,
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: {
      height: 2,
      width: 1
    },
  },
  topContainer: {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#e1e1e1',
    borderBottomWidth: 1
  },
  avatar: {
    backgroundColor: 'gray',
    width: 35,
    height: 35,
    borderRadius: 4,
    marginRight: 6
  },
  time: {
    fontSize: 13,
    color: '#8999a5',
    marginTop: 2
  },
  name: {
    color: '#ff9630',
    fontWeight: '600',
    fontSize: 14
  },
  middleContainer: {
    padding: 10,
    borderColor: '#e1e1e1',
    borderBottomWidth: 1
  },
  msgImage: {
    marginTop: 10,
    height: 200,
    backgroundColor: '#e1e1e1'
  },
  bottomContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#fafafa'
  },
  bottomTool: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomToolText: {
    color: '#6D6D78',
    fontWeight: '500',
    alignItems: 'center'
  },
  userContainer: {
    flexDirection: 'row'
  }
});

let mockData = [
  {
    "id": "41",
    "nickname": "Bob Brown",
    "avatar": "1",
    "text": "Behind every successful man there's a lot u unsuccessful years. https://www.google.com/",
    "original_pic": "",
    "created_at": "1404709434"
  },
  {
    "id": "40",
    "nickname": "Jean Kerr",
    "avatar": "7",
    "text": "I think success has no rules, but you can learn a lot from failure. ",
    "original_pic": "",
    "created_at": "1404708544"
  },
  {
    "id": "39",
    "nickname": "Colin L. Powell",
    "avatar": "3",
    "text": "There are no secrets to success. It is the result of preparation, hard work, and learning from failure. www.youtube.com ",
    "original_pic": "",
    "created_at": "1404708455"
  },
  {
    "id": "38",
    "nickname": "Balzac",
    "avatar": "5",
    "text": "There is no such thing as a great talent without great will - power.",
    "original_pic": "http://lorempixel.com/1000/700/nature/5/",
    "created_at": "1404707590"
  }];

class ShowView extends Component {
  static componentName = 'ShowView';

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      timeline: ds.cloneWithRows(mockData)
    }
  }

  render () {
    return (
      <ListView
        renderRow={this._renderRowView.bind(this)}
        onFetch={this._onFetch.bind(this)}
        dataSource={this.state.timeline}
      />
    )
  };

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  componentDidMount = () => {
    this._onFetch();
  };

  _onFetch(page = 1){
    this.setState({
      timeline: this.getUpdatedDataSource(mockData)
    });
  }

  getUpdatedDataSource(data) {
    let rows = data;
    let ids = rows.map((obj, index) => index);

    return this.state.timeline.cloneWithRows(rows, ids);
  }

  _renderRowView(info) {
    return (
      <View underlayColor='transparent' onPress={this._gotoDetails.bind(this, info)}>
        <View ref={component => this._root = component} style={styles.tweetContainer}>
          <View style={styles.topContainer}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
            <View>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{info.nickname}</Text>
                {/*<Text style={styles.time}>{'#' + info.id + ' '} {moment(info.created_at * 1000).fromNow()}</Text>*/}
                <Text style={styles.time}>{'#' + info.id + ' '} {info.created_at}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <ParsedText parse={[{type: 'url', style: styles.url, onPress: this._handleUrlPress.bind(this)}]}>{info.text}</ParsedText>
            {this._renderMsgImage(info)}
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomTool}>
              <Text style={styles.bottomToolText}>评论</Text>
            </View>
            <View style={styles.bottomTool}>
              <Text style={styles.bottomToolText}>赞</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderMsgImage(info) {

  }

  _handleUrlPress(url) {

  }

  _gotoDetails(tweet) {

  }

  _openPhotoBrowser(info) {

  }
}

export default ShowView;
