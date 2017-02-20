import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  ScrollView,
  StyleSheet,
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
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
          <Text>马上到来</Text>
      </ScrollView>
    </View>
  )
}

export default DatingView;
