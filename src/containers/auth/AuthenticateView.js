import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { AppStyles, AppSizes } from '@theme/';
import { Spacer, Text, Button } from '@ui/';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.85,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
});

class Authenticate extends Component {
  static componentName = 'Authenticate';

  render = () => (
    <Image
      source={require('../../images/login.jpg')}
      style={[AppStyles.containerCentered, AppStyles.container, styles.background]}
    >
      <Image
        source={require('../../images/logo.png')}
        style={[styles.logo]}
      />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'登录'}
            onPress={Actions.login}
          />
        </View>
      </View>

      <Spacer size={10} />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'注册'}
            onPress={Actions.signUp}
          />
        </View>
      </View>

      <Spacer size={5} />

      <Text p style={[AppStyles.textCenterAligned, styles.whiteText]}>
        . . . . .  . . - - -  - - - - -
      </Text>

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]} />
        <View style={[AppStyles.flex2]}>
          <Button
            title={'找个程序员修电脑'}
            onPress={Actions.comingSoon}
            backgroundColor={'transparent'}
            raised={false}
          />
        </View>
        <View style={[AppStyles.flex1]} />
      </View>

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]} />
        <View style={[AppStyles.flex2]}>
          <Button
            title={'随便看看'}
            onPress={Actions.app}
            backgroundColor={'transparent'}
            raised={false}
          />
        </View>
        <View style={[AppStyles.flex1]} />
      </View>

      <Spacer size={40} />
    </Image>
  )
}

export default Authenticate;
