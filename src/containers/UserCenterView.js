/**
 * Style Guide
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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

// Example Data
const dummyData1 = [
  { title: '设置', icon: 'build' },
  { title: 'Alarms', icon: 'alarm' },
  { title: 'Cards', icon: 'card-membership' },
  { title: 'Favourites', icon: 'grade' },
  { title: 'Help', icon: 'help' },
];

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
  tabbar_text: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
class UserCenter extends Component {
  static componentName = 'UserCenter';

  constructor(props) {
    super(props);

    // Setup ListViews
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(dummyData1),
    };
  }

  /**
    * Each List Item
    */
  renderRow = (data, sectionID) => (
    <ListItem
      key={`list-row-${sectionID}`}
      onPress={Actions.comingSoon}
      title={data.title}
      subtitle={data.role || null}
      leftIcon={data.icon ? { name: data.icon } : null}
      avatar={data.avatar ? { uri: data.avatar } : null}
      roundAvatar={!!data.avatar}
    />
  );

  render = () => (
    <View style={styles.tabContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
      </ScrollView>
    </View>
  )
}

/* Export Component ==================================================================== */
export default UserCenter;
