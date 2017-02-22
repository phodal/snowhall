import React, {Component, PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {rootReducer} from '@redux/index';
import * as UserActions from '@redux/user/actions';

import {AppColors, AppStyles} from '@theme/';
import {connect} from 'react-redux';

import {
  List,
  ListItem,
} from '@components/ui/';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  logout: UserActions.logout,
};

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
  image: {
    width: 96,
    height: 96,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 10,
  },
  name: {
    flex: 1,
    alignItems: 'center',
  }
});

class UserCenter extends Component {
  static componentName = 'UserCenter';

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      logout: this.props.logout,
    }
  }

  render = () => (
    <View style={styles.tabContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
        { this.state.user && this.state.user.avatar_urls && this.state.user.avatar_urls['96'] ?
          <Image source={{ uri: this.state.user.avatar_urls['96']}} style={styles.image}/>
          : null
        }
        { this.state.user && this.state.user.name ?
          <Text style={styles.name}>{this.state.user.name}</Text> : null
        }

        { this.state.user && this.state.user.name ?
          <ListItem
            key={`logout`}
            onPress={this.state.logout}
            title='注销'
            leftIcon={{ name: 'build' }}
          /> :
          <ListItem
            key={`login`}
            onPress={Actions.login}
            title='登录'
            leftIcon={{ name: 'build' }}
          /> }

      </ScrollView>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
