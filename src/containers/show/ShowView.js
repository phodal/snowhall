import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
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
  List,
  ListItem,
  FormInput,
  FormLabel,
} from '@components/ui/';

import ParsedText from 'react-native-parsed-text'
import { Actions } from 'react-native-router-flux';
import moment from "moment";

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
    "avatar": "http://articles.phodal.com/qrcode.jpg",
    "text": "Behind every successful man there's a lot u unsuccessful years. https://www.phodal.com/",
    "original_pic": "",
    "created_at": "1404709434"
  },
  {
    "id": "40",
    "nickname": "Jean Kerr",
    "avatar": "http://articles.phodal.com/qrcode.jpg",
    "text": "I think success has no rules, but you can learn a lot from failure. ",
    "original_pic": "",
    "created_at": "1404708544"
  },
  {
    "id": "38",
    "nickname": "Balzac",
    "avatar": "http://articles.phodal.com/qrcode.jpg",
    "text": "There is no such thing as a great talent without great will - power.",
    "original_pic": "http://articles.phodal.com/qrcode.jpg",
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
      <TouchableHighlight underlayColor='transparent' onPress={this._gotoDetails.bind(this, info)}>
        <View ref={component => this._root = component} style={styles.tweetContainer}>
          <View style={styles.topContainer}>
            <Image source={{uri: info.avatar}} style={styles.avatar} />
            <View>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{info.nickname}</Text>
                <Text style={styles.time}>{'#' + info.id + ' '} {moment(info.created_at * 1000).fromNow()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <ParsedText parse={[{type: 'url', style: styles.url, onPress: this._handleUrlPress.bind(this)}]}>{info.text}</ParsedText>
            {this._renderMsgImage(info)}
          </View>
          <View style={styles.bottomContainer}>
            <TouchableHighlight underlayColor='transparent' onPress={this._showComment.bind(this)} style={styles.bottomTool}>
              <Text style={styles.bottomToolText}>评论</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='transparent' onPress={this._likeIt.bind(this)} style={styles.bottomTool}>
              <Text style={styles.bottomToolText}>赞</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _likeIt() {

  }

  _showComment() {

  }

  _renderMsgImage(info) {
    if(info.original_pic) {
      return (
        <TouchableHighlight onPress={this._openPhotoBrowser.bind(this, info)}>
          <Image source={{uri: info.original_pic}} style={[styles.msgImage, { resizeMode: Image.resizeMode.cover }]} />
        </TouchableHighlight>
      )
    }
  }



  _handleUrlPress(url) {
    Actions.webView({
      onNavigationStateChange: () => {},
      url: url
    });
  }

  _gotoDetails(tweet) {

  }

  _openPhotoBrowser(info) {
    Actions.photoBrowserView({
      mediaList: [{
        photo: info.original_pic,
        caption: info.text
      }]
    });
  }
}

export default ShowView;
