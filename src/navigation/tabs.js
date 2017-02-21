import React from 'react';
import { Scene } from 'react-native-router-flux';

import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

import { TabIcon } from '@ui/';

import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';
import UserCenter from '@containers/UserCenterView';
import DatingView from "../containers/DatingView";
import ShowView from "../containers/ShowView";

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'recipes'}
      title={'Recipes'}
      icon={props => TabIcon({ ...props, icon: 'home' })}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title='首页'
        analyticsDesc={'Home: Browse Home Page'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : '文章')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
    </Scene>

    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'约'}
      component={DatingView}
      icon={props => TabIcon({ ...props, icon: 'wc' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'showView'}
      {...navbarPropsTabs}
      title={'秀'}
      component={ShowView}
      icon={props => TabIcon({ ...props, icon: 'palette' })}
      analyticsDesc={'ShowView: Style Guide'}
    />

    <Scene
      key={'userCenter'}
      {...navbarPropsTabs}
      title={'我'}
      component={UserCenter}
      icon={props => TabIcon({ ...props, icon: 'people' })}
      analyticsDesc={'User: User Center'}
    />
  </Scene>
);

export default scenes;
