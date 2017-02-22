import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Card, Tile } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Spacer } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
});

/* Component ==================================================================== */
class CardView extends Component {
  static componentName = 'CardView';

  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onPressFavourite: PropTypes.func,
    isFavourite: PropTypes.bool,
  }

  render = () => {
    const { title, content, image, onPress, date } = this.props;
    let width = Dimensions.get('window').width;

    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        {image && { uri: image } !== '' ?
            <View>
              <Tile
                imageSrc={{ uri: image }}
                title={title}
                onPress={onPress}
                featured
                height={width*0.6}
                caption={content}
              />

              <Spacer size={20} />
            </View>
          :

          <Card image={image && { uri: image }}>
            <View style={[AppStyles.paddingBottomSml]}>
              <Text>{title}</Text>
              <Text>{date}</Text>
              <Text>{content}</Text>
            </View>
          </Card>
        }
      </TouchableOpacity>
    );
  }
}

/* Export Component ==================================================================== */
export default CardView;
