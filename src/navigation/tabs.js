import React from "react";
import {Scene, Actions} from "react-native-router-flux";
import {AppConfig} from "@constants/";
import {AppStyles, AppSizes} from "@theme/";
import {TabIcon} from "@ui/";
import Recipes from "@containers/recipes/Browse/BrowseContainer";
import RecipeView from "@containers/recipes/RecipeView";
import UserCenter from "@containers/UserCenterView";
import DatingView from "../containers/dating/DatingView";
import ShowView from "../containers/show/ShowView";
import MeetupView from "../containers/MeetupView";
import {Image} from "react-native";

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
      title={'寻'}
      component={DatingView}
      icon={props => TabIcon({ ...props, icon: 'wc' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'showView'}
      {...navbarPropsTabs}
      title={'秀'}
      component={ShowView}
      onRight={()=> {
        Actions.tweetEditView()
      }}
      rightTitle="秀一个"
      rightButtonTextStyle = {AppStyles.rightButtonStyle}
      icon={props => TabIcon({ ...props, icon: 'palette' })}
      analyticsDesc={'ShowView: Style Guide'}
    />

    <Scene
      key={'meetupView'}
      {...navbarPropsTabs}
      title={'约'}
      component={MeetupView}
      icon={props => TabIcon({ ...props, icon: 'dashboard' })}
      analyticsDesc={'MeetupView: Style Guide'}
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
