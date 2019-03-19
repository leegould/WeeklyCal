import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import Day from './Day';
import { CalendarDay } from './shared';

type Props = {
  navigation: {
    navigate: Function,
  }
};

type State = {
  week: CalendarDay[],
};

export default class Week extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor(props:Props) {
    super(props);

    this.state = {
      week: [...Array(7).keys()].map(i => { return { date: moment().add(i, 'days'), events: [] }} ),
    }
  }

  async componentDidMount() {
    try {
      const authResult = await RNCalendarEvents.authorizeEventStore();
      console.log('Calendar.Authorized', authResult);
      
      const calendars = await RNCalendarEvents.findCalendars();
      console.log('componentDidMount', calendars);

      const week = await Promise.all(this.state.week.map(async day => {
        day.events = await RNCalendarEvents.fetchAllEvents(
          day.date.clone().startOf(),
          day.date.clone().endOf()
        );
        console.log('day', day);
        return day;
      }))

      await this.setState({week});
    }
    catch (err) {
      console.log('componentDidMount.error', err);
    }
  }

  // async addEvent() {
      // const result = await RNCalendarEvents.saveEvent('Title of event', {
      //   startDate: '2016-08-19T19:26:00.000Z',
      //   endDate: '2017-08-19T19:26:00.000Z'
      // });
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.week[0].date.date()} - {this.state.week[6].date.date()}</Text>
          <Text style={styles.headerText}>{this.state.week[0].date.format('MMM')}</Text>
          <Text style={styles.headerText}>{this.state.week[0].date.format('YYYY')}</Text>
          <Button
            title="Opt"
            onPress={() => this.props.navigation.navigate('Options')}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.firstRow}>
            <Day day={this.state.week[0]} isToday />
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Day day={this.state.week[1]} />
              <Day day={this.state.week[3]} />
              <Day day={this.state.week[5]} />
            </View>
            <View style={styles.col}>
              <Day day={this.state.week[2]} />
              <Day day={this.state.week[4]} />
              <Day day={this.state.week[6]} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
    marginBottom: 40,
  },
  header: {
    height: 50,
    backgroundColor: 'purple',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    backgroundColor: 'orange',
    padding: 3,
    color: 'black',
  },
  midHeader: {
    backgroundColor: 'white',
  },
  rightHeader: {
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 3,
    flexDirection: 'row', 
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    padding: 5,
    paddingTop: 0,
  },
  firstRow: {
    flex: 1,
    backgroundColor: 'grey',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 0,
  },
  col: {
    flex: 1,
  },
});
