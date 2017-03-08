import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Svg, {Rect} from "react-native-svg";

class StacksView extends Component {

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

export default StacksView;
