import React, {
  PropTypes,
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

  static propTypes = {
    mediaList: PropTypes.array
  };

  render() {
    return (
      <PhotoBrowser
        mediaList={this.props.mediaList}
        enableGrid={false}
        useCircleProgress
      />
    )
  }
}
