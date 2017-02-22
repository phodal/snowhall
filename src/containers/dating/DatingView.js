import React, {Component} from 'react';
import {
  View,
  Alert,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SearchBar } from 'react-native-elements'
import {AppColors, AppStyles} from '@theme/';

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
import Tinder from './Tinder.js'

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

class DatingView extends Component {
  static componentName = 'DatingView';

  constructor(props) {
    super(props);
  }

  render = () => (
    <View style={styles.tabContainer}>
      <SearchBar
        lightTheme
        onChangeText={this.changeText.bind(this)}
        placeholder='Type Here...'/>

      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
        <Tinder style={{flex: 1}}/>
      </ScrollView>
    </View>
  );

  changeText() {

  }
}

export default DatingView;
