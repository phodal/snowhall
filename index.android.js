/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class snowhall extends Component {
  render() {
    return (
      <View>
        <View style={[styles.actionBar,styles.row]}>
          <Text style={[styles.title]}>
            雪堂
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EE7700',
  },
  row:{
    flexDirection:'row',
  },
  title:{
    color: '#ffffff',
  },
  actionBar: {
    height:49,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#80d8d8',
  }
});

AppRegistry.registerComponent('snowhall', () => snowhall);
