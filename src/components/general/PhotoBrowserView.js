import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import PhotoBrowser from 'react-native-photo-browser'

export default class PhotoBrowserView extends Component {
  static componentName = 'PhotoBrowserView';

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <PhotoBrowser
          mediaList={this.props.mediaList}
          enableGrid={false}
          useCircleProgress
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});