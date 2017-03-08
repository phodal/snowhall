import React, {
  PropTypes,
  Component
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import PhotoBrowser from 'react-native-photo-browser'
import {Actions} from 'react-native-router-flux';

export default class PhotoBrowserView extends Component {
  static componentName = 'PhotoBrowserView';

  constructor(props) {
    super(props);
    this.state = {}
  }

  static propTypes = {
    mediaList: PropTypes.array
  };

  gotoBack() {
    Actions.pop()
  };

  render() {
    return (
      <PhotoBrowser
        mediaList={this.props.mediaList}
        onBack={this.gotoBack.bind(this)}
        enableGrid={false}
        useCircleProgress
      />
    )
  }
}
