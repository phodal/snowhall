import React, {Component} from "react";
import {View, Text, Image, ListView, ScrollView, StyleSheet} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Card} from "@components/ui/";
import CommonContainer from "../common/CommonContainer";

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1, width: null, height: 40
  },
});

class StacksView extends Component {

  constructor(props) {
    super(props);
  }

  renderElement = (data) => {
    return <View>
      <Card>
        <Text style={AppStyles.h2}>{data.title}</Text>
        {data.featured_image === null ? null :
          <View style={styles.imageContainer}>
            <Image resizeMode='cover'
                   source={{uri: data.featured_image}} style={styles.image}/>
          </View>
        }
        <Text>{data.description}</Text>
      </Card>
    </View>
  };

  render = () => (
    <ScrollView>
      <View style={[AppStyles.tabContainer]}>
        <CommonContainer url={'http://192.168.31.170:8000/api/stack/'} element={data => this.renderElement(data)}/>
      </View>
    </ScrollView>
  )
}

export default StacksView;
