import React, { Component, PropTypes } from 'react';
import {
  WebView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';
import { Actions } from 'react-native-router-flux';

// Components
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
  },
  topbar: {
    height: 60,
    backgroundColor: AppColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: AppStyles.h2.fontSize,
    color: '#FFF'
  }
});

/* Component ==================================================================== */
class AppWebView extends Component {
  static componentName = 'AppWebView';

  static propTypes = {
    url: PropTypes.string.isRequired,
    onNavigationStateChange: PropTypes.func,
  };

  static defaultProps = {
    onNavigationStateChange: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      webViewURL: props.url || null,
    };
  }

  componentDidMount = () => {
    // Wait until interaction has finished before loading the webview in
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  };

  /**
    * Each time page loads, update the URL
    */
  onNavigationStateChange = (navState) => {
    this.state.webViewURL = navState.url;
    if (this.props.onNavigationStateChange) this.props.onNavigationStateChange(navState.url);
  };

  onBack = () => {
    Actions.pop();
  };

  render = () => {
    const { webViewURL, loading } = this.state;

    console.log(webViewURL);

    if (loading) return <Loading />;
    if (!webViewURL) return <Error type={'URL not defined.'} />;

    return (
      <ScrollView style={[AppStyles.container]}>
        <View style={styles.topbar}>
          <TouchableOpacity
            onPress={this.onBack.bind(this)}
          >
            <Text style={styles.text}> 返回 </Text>
          </TouchableOpacity>
        </View>
        <WebView
          scalesPageToFit
          startInLoadingState
          source={{ uri: webViewURL }}
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.container, styles.container]}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default AppWebView;
