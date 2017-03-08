import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {TabViewAnimated, TabBarTop} from "react-native-tab-view";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Tinder from "./Tinder.js";

const styles = StyleSheet.create({});

class LinkView extends Component {
  static componentName = 'LinkView';

  constructor(props) {
    super(props);
  }

  render = () => (
    <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}>

    </ScrollView>
  );
}

export default LinkView;
