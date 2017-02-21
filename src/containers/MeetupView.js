import React, {Component} from "react";
import {View, Alert, ListView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AppColors, AppStyles} from "@theme/";
import {Alerts, Button, Card, Spacer, Text, List, ListItem, FormInput, FormLabel} from "@components/ui/";
import Calendar from 'react-native-calendar';
import moment from "moment";

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

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class MeetupView extends Component {
  static componentName = 'MeetupView';

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format(),
    };
  }

  render = () => (
    <View style={styles.tabContainer}>
      <Calendar
        ref="calendar"
        eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
        events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
        scrollEnabled
        showControls
        dayHeadings={customDayHeadings}
        monthNames={customMonthNames}
        titleFormat={'MMMM YYYY'}
        prevButtonText={'Prev'}
        nextButtonText={'Next'}
        onDateSelect={(date) => this.setState({ selectedDate: date })}
        onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
        onTouchNext={(e) => console.log('onTouchNext: ', e)}
        onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
        onSwipeNext={(e) => console.log('onSwipeNext', e)}
      />
      <Text>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
    </View>
  )
}

export default MeetupView;
