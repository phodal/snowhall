import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Card, Tile } from 'react-native-elements';
import { AppStyles, AppSizes } from '@theme/';
import { Spacer } from '@ui/';

const styles = StyleSheet.create({
  featuredImage: {
    left: 0,
    right: 0,
    height: AppSizes.screen.height * 0.2,
    resizeMode: 'cover',
  },
});

class DetailView extends Component {
  static componentName = 'DetailView';

  static propTypes = {
    recipe: PropTypes.shape({
      title: PropTypes.object.isRequired,
      content: PropTypes.object,
      featured_image: PropTypes.string,
    }).isRequired,
  };

  render = () => {
    const { title, content } = this.props.recipe;
    const featuredImage = this.props.recipe.featured_image;
    let width = Dimensions.get('window').width;

    return (
      <ScrollView style={[AppStyles.container]}>
        <View>
          {featuredImage !== '' &&
            <Tile
              imageSrc={{ uri: featuredImage }}
              title={title.rendered}
              featured
              height={width*0.6}
            />
          }

          <Card>
            <Text>{content.rendered}</Text>
          </Card>
          <Spacer size={100}/>
        </View>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default DetailView;
