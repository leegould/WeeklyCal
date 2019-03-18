import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import moment, { Moment } from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import Day from './Day';
import CalendarEvent from './shared';

type Props = {
  navigation: {
    navigate: Function,
  }
};

type State = {
  startOfWeek: Moment,
  endOfWeek: Moment,
  weekEvents: CalendarEvent[],
};

export default class Week extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      startOfWeek: moment(),
      endOfWeek: moment().add(6, 'days'),
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
    const { startOfWeek, endOfWeek } = this.state;

    return (
      <View style={styles.container}>
        {/* <Calendar /> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{startOfWeek.date()} - {endOfWeek.date()}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('MMM')}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('YYYY')}</Text>
          <Button
            title="Opt"
            onPress={() => this.props.navigation.navigate('Options')}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.firstRow}>
            <Day date={startOfWeek} events={this.state.weekEvents} />
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Day date={moment().add(1, 'days')} />
              <Day date={moment().add(3, 'days')} />
              <Day date={moment().add(5, 'days')} />
            </View>
            <View style={styles.col}>
              <Day date={moment().add(2, 'days')} />
              <Day date={moment().add(4, 'days')} />
              <Day date={moment().add(6, 'days')} />
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
