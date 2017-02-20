/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeView';

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
        title='玩我'
        analyticsDesc={'Home: Browse Home Page'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Recipe')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
    </Scene>

    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'wc' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'styleGuide'}
      {...navbarPropsTabs}
      title={'秀秀'}
      component={StyleGuide}
      icon={props => TabIcon({ ...props, icon: 'palette' })}
      analyticsDesc={'StyleGuide: Style Guide'}
    />

    <Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'秀秀'}
      component={Error}
      icon={props => TabIcon({ ...props, icon: 'people' })}
      analyticsDesc={'User: User Center'}
    />
  </Scene>
);

export default scenes;
