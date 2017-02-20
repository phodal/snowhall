/**
 * Auth Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Scenes
import Authenticate from '@containers/auth/AuthenticateView';
import AuthWebView from '@containers/auth/WebView';
import AuthLogin from '@containers/auth/Login/LoginContainer';

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'authenticate'}>
    <Scene
      hideNavBar
      key={'authLanding'}
      component={Authenticate}
      type={ActionConst.RESET}
      analyticsDesc={'Authenticate: Authentication'}
    />
    <Scene
      {...AppConfig.navbarProps}
      key={'login'}
      title={'登录'}
      clone
      component={AuthLogin}
      analyticsDesc={'AuthLogin: Login'}
    />
    <Scene
      {...AppConfig.navbarProps}
      key={'signUp'}
      title={'注册'}
      clone
      component={AuthWebView}
      url={AppConfig.urls.signUp}
      analyticsDesc={'AuthWebView: Sign Up'}
    />
    <Scene
      {...AppConfig.navbarProps}
      key={'passwordReset'}
      title={'重置密码'}
      clone
      component={AuthWebView}
      url={AppConfig.urls.resetPassword}
      analyticsDesc={'AuthWebView: Password Reset'}
    />
  </Scene>
);

export default scenes;
