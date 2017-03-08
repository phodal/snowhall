import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  TSpan,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbar_text: {
    color: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class MeetupView extends Component {

  constructor(props) {
    super(props);

  }

  render = () => (
    <Svg
      height="1000"
      width="1000"
    >
      <Rect rx="10" ry="10" x="100" y="200" width="60" height="60"/>
      <Rect rx="10" ry="10" x="200" y="300" width="60" height="60"/>
    </Svg>
  )
}

export default MeetupView;
