import React from "react";
import {Scene, Actions} from "react-native-router-flux";
import {AppConfig} from "@constants/";
import {AppStyles, AppSizes} from "@theme/";
import {TabIcon} from "@ui/";
import Recipes from "@containers/recipes/Browse/BrowseContainer";
import RecipeView from "@containers/recipes/DetailView";
import UserCenter from "@containers/user-center/UserCenterView";
import ShowView from "../containers/show/ShowView";
import StacksView from "../containers/stacks/StacksView";
import FindView from "../containers/find/FindView";

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
        analyticsDesc={'DetailView: View Recipe'}
      />
    </Scene>

    <Scene
      key={'datingView'}
      {...navbarPropsTabs}
      title={'寻找'}
      component={FindView}
      icon={props => TabIcon({ ...props, icon: 'wc' })}
      analyticsDesc={'FindView: Coming Soon'}
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
      title={'推栈'}
      component={StacksView}
      icon={props => TabIcon({ ...props, icon: 'dashboard' })}
      analyticsDesc={'StacksView: Meetup'}
    />

    <Scene
      key={'userCenter'}
      {...navbarPropsTabs}
      title={'我'}
      component={UserCenter}
      icon={props => TabIcon({ ...props, icon: 'people' })}
      analyticsDesc={'UserCenter: User Center'}
    />
  </Scene>
);

export default scenes;
