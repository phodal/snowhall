/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Card, Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  featuredImage: {
    left: 0,
    right: 0,
    height: AppSizes.screen.height * 0.2,
    resizeMode: 'cover',
  },
});

/* Component ==================================================================== */
class RecipeView extends Component {
  static componentName = 'RecipeView';

  static propTypes = {
    recipe: PropTypes.shape({
      title: PropTypes.object.isRequired,
      content: PropTypes.object,
      featured_image: PropTypes.string,
    }).isRequired,
  };

  /**
    * Ingredients
    */
  renderIngredients = (ingredients) => {
    const ingJsx = [];
    let iterator = 1;

    ingredients.forEach((item) => {
      ingJsx.push(
        <View key={`ingredient-${iterator}`} style={[AppStyles.row]}>
          <View><Text> - </Text></View>
          <View style={[AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.ingredient.toString()}</Text>
          </View>
        </View>,
      );
      iterator += 1;
    });

    return ingJsx;
  };

  /**
    * Method
    */
  renderMethod = (methods) => {
    const ingJsx = [];
    let iterator = 1;

    methods.forEach((item) => {
      ingJsx.push(
        <View key={`method-${iterator}`} style={[AppStyles.row]}>
          <View><Text> {iterator}. </Text></View>
          <View style={[AppStyles.paddingBottomSml, AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.method.toString()}</Text>
          </View>
        </View>,
      );
      iterator += 1;
    });

    return ingJsx;
  }

  render = () => {
    const { title, content } = this.props.recipe;
    const featuredImage = this.props.recipe.featured_image;

    return (
      <ScrollView style={[AppStyles.container]}>
        {featuredImage !== '' &&
          <Image
            source={{ uri: featuredImage }}
            style={[styles.featuredImage]}
          />
        }

        <Card>
          <Text h2>{title.rendered}</Text>
          <Text>{content.rendered}</Text>
        </Card>
        <Spacer size={20} />
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeView;
