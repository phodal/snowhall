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
import CommonContainer from "../common/CommonContainer";

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

class ShowView extends Component {
  static componentName = 'ShowView';

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ScrollView>
        <View style={[AppStyles.tabContainer]}>
          <CommonContainer url={'http://192.168.31.170:8000/api/show/'} element={data => this._renderRowView(data)}/>
        </View>
      </ScrollView>
    )
  };

  _renderRowView(data) {
    return (
      <TouchableHighlight underlayColor='transparent' onPress={this._gotoDetails.bind(this, data)}>
        <View style={styles.tweetContainer}>
          <View style={styles.topContainer}>
            <Image source={{uri: data.user.avatar.avatar}} style={styles.avatar} />
            <View>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{data.user.username}</Text>
                <Text style={styles.time}>  {moment(data.posted_on).fromNow()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <ParsedText parse={[{type: 'url', style: styles.url, onPress: this._handleUrlPress.bind(this)}]}>{data.title}</ParsedText>
            {this._renderMsgImage(data)}
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

  _renderMsgImage(data) {
    if(data.image) {
      return (
        <TouchableHighlight onPress={this._openPhotoBrowser.bind(this, data)}>
          <Image source={{uri: data.image}} style={[styles.msgImage, { resizeMode: Image.resizeMode.cover }]} />
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

  _openPhotoBrowser(data) {
    Actions.photoBrowserView({
      mediaList: [{
        photo: data.image,
        caption: data.title
      }]
    });
  }
}

export default ShowView;
