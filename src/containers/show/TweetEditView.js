import React, { Component } from 'react';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { AppColors, AppStyles } from '@theme/';
import Editor from '../../components/general/Editor'


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
  tabbar_text: {
    color: '#FFF',
  },
});

class TweetEditView extends Component {
  static componentName = 'TweetEditView';

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentWillMount() {
    // this.props.route.sendTweet = this.sendTweet.bind(this)
  }

  sendTweet() {
    Alert.alert(
      'Sent successfully',
      this.state.text,
      [
        {text: 'OK', onPress: () => this.props.navigator.pop()}
      ]
    )
  }

  onChangeText(text) {
    this.setState({
      text: text
    })
  }

  render = () => (
    <View style={styles.tabContainer}>
      <Editor
        onChangeText={this.onChangeText.bind(this)}
        placeholder={'What\'s happening'}
        text={this.state.text}/>
    </View>
  )
}

export default TweetEditView;
