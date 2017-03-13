import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import CommonContainer from "../common/CommonContainer";


const styles = StyleSheet.create({
  image:{
    width: 120,
    height: 120
  },
});

class StacksView extends Component {

  constructor(props) {
    super(props);

  }

  renderElement = (data) => {
    return <View>
      <Card>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
        {data.featured_image === null ? null :
          <Image source={{uri: data.featured_image}} style={styles.image}/>
        }
      </Card>
    </View>
  };

  render = () => (
    <View style={[AppStyles.tabContainer]}>
      <CommonContainer url={'http://192.168.31.170:8000/api/stack/'} element={data => this.renderElement(data)} />
    </View>
  )
}

export default StacksView;
