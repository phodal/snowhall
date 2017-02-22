// Tinder.js
'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import { Tile } from 'react-native-elements';
import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    return (
      <View>
        <Tile
          imageSrc={{require: ('../../images/demo-tile.jpg')}}
          title={this.props.text}
          titleStyle={{color: this.props.backgroundColor}}
          featured
          width={250}
          height={350}
          caption="this is a test"
        />

        <Text>草仲马</Text>
        <Text>2x岁</Text>
        <Text>160cm</Text>
        <Text>10k</Text>
      </View>
    )
  }
});

const Cards = [
  {text: 'Tomato', backgroundColor: 'red'},
  {text: 'Aubergine', backgroundColor: 'purple'},
  {text: 'Courgette', backgroundColor: 'green'},
  {text: 'Blueberry', backgroundColor: 'blue'},
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
];

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
});

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards
    }
  },
  gotoUserDetail () {

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        onClickHandler={this.gotoUserDetail.bind(this)}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 350,
  },
  tile: {
    width: 250,
    height: 350,
  }
});
