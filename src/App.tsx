import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment, { Moment } from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import Day from './Day';
import CalendarEvent from './shared';

type Props = {};

type State = {
  startOfWeek: Moment,
  endOfWeek: Moment,
  weekEvents: CalendarEvent[],
};

export default class App extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      startOfWeek: moment().day(0),
      endOfWeek: moment().day(6),
      weekEvents: [],
    }
  }

  async componentDidMount() {
    try {
      const authResult = await RNCalendarEvents.authorizeEventStore();
      console.log('Calendar.Authorized', authResult);
      
      const calendars = await RNCalendarEvents.findCalendars();

      const events = await RNCalendarEvents.fetchAllEvents(
        this.state.startOfWeek,
        this.state.endOfWeek,
      );
      this.setState({
        weekEvents: events,
      });
      console.log('componentDidMount', calendars, events);
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
    const startOfWeek = moment().day(0);
    const endOfWeek = moment().day(6);

    return (
      <View style={styles.container}>
        {/* <Calendar /> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{startOfWeek.date()} - {endOfWeek.date()}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('MMM')}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('YYYY')}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Day date={startOfWeek} events={this.state.weekEvents} />
              <Day date={moment().day(2)} />
              <Day date={moment().day(4)} />
            </View>
            <View style={styles.col}>
              <Day date={moment().day(1)} />
              <Day date={moment().day(3)} />
              <Day date={moment().day(5)} />
            </View>
          </View>
          <View style={styles.lastRow}>
            <Day date={endOfWeek} />
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
    paddingBottom: 0,
  },
  lastRow: {
    flex: 1,
    backgroundColor: 'grey',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  col: {
    flex: 1,
  },
});
