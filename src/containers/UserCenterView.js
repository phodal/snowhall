import React, {Component} from 'react';
import {
  View,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {AppColors, AppStyles} from '@theme/';

import {
  List,
  ListItem,
} from '@components/ui/';

const styles = StyleSheet.create({
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

class UserCenter extends Component {
  static componentName = 'UserCenter';

  constructor(props) {
    super(props);
  }


  render = () => (
    <View style={styles.tabContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
        <ListItem
          key={`login`}
          onPress={Actions.login}
          title='登录'
          leftIcon={{ name: 'build' }}
        />
      </ScrollView>
    </View>
  )
}

/* Export Component ==================================================================== */
export default UserCenter;
