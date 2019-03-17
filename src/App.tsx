import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import Day from './Day';

type Props = {};
export default class App extends Component<Props> {
  render() {
    const startOfWeek = moment().day(0);
    const endOfWeek = moment().day(6);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{startOfWeek.date()} - {endOfWeek.date()}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('MMM')}</Text>
          <Text style={styles.headerText}>{startOfWeek.format('YYYY')}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Day date={startOfWeek} />
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
