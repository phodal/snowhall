import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";

const styles = StyleSheet.create({});

class LinkView extends Component {
  static componentName = 'LinkView';

  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://phodal.github.io/mockfall/link/api.json', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => { // responseData = undefined
        this.state.links = responseData.results;
      })
  }

  render = () => {
    var linkElement = this.state.links.map(function (link) {
      return (
        <li key={link.slug}>{link.title}</li>
      );
    });


  return (
    <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}>
      <ul>
        {linkElement}
      </ul>
    </ScrollView>
  )
};
}

export default LinkView;
