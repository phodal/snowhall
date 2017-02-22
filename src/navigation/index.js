/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

import AppLaunch from '@containers/Launch/LaunchContainer';
import Placeholder from '@components/general/Placeholder';
import AuthScenes from './auth';
import TabsScenes from './tabs';
import PhotoBrowserView from "../components/general/PhotoBrowserView";
import WebView from "../components/general/WebView";
import TweetEditView from "../containers/show/TweetEditView";

/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
    <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
      analyticsDesc={'AppLaunch: Launching App'}
    />

    {/* Auth */}
    {AuthScenes}

    {/* Main App */}
    <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>
      {/* Drawer Side Menu */}
      <Scene key={'home'} initial={'tabBar'}>
        {/* Tabbar */}
        {TabsScenes}
      </Scene>

      {/* General */}
      <Scene
        key={'photoBrowserView'}
        hideTabBar={true}
        hideNavBar={true}
        component={PhotoBrowserView}
        analyticsDesc={'PhotoBrowserView: View Photo'}
      />

      <Scene
        key={'webView'}
        title={'查看网页'}
        clone
        component={WebView}
        analyticsDesc={'WebView: Open View'}
      />

      <Scene
        key={'tweetEditView'}
        title={'秀一个'}
        clone
        rightTitle=''
        component={TweetEditView}
        analyticsDesc={'TweetEditView: Open View'}
      />
    </Scene>

    <Scene
      key={'comingSoon'}
      title={'Coming Soon'}
      component={Placeholder}
      analyticsDesc={'Placeholder: Coming Soon'}
    />
  </Scene>,
);
