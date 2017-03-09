import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Loading from '@components/general/Loading';

const styles = StyleSheet.create({});

class LinkView extends Component {
  static componentName = 'LinkView';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      links: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true
    });

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
        this.setState({
          loading: false,
          links: responseData.results
        });
      })
  }

  render = () => {
    if (this.state.loading) {
      return <Loading />
    }
    var linkElement = this.state.links.map(function (link) {
      return (
        <li key={link.slug}>{link.title}</li>
      );
    });


  return (
    <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}>
      {linkElement}
    </ScrollView>
  )
};
}

export default LinkView;
