import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>2nd - 9th</Text>
          <Text style={styles.headerText}>March</Text>
          <Text style={styles.headerText}>2019</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.day}>
                <Text>Sunday</Text>
              </View>
              <View style={styles.day}>
                <Text>Tuesday</Text>
              </View>
              <View style={styles.day}>
                <Text>Thursday</Text>
              </View>
            </View>
            <View style={styles.col}>
              <View style={styles.day}>
                <Text>Monday</Text>
              </View>
              <View style={styles.day}>
                <Text>Wednesday</Text>
              </View>
              <View style={styles.day}>
                <Text>Friday</Text>
              </View>
            </View>
          </View>
          <View style={styles.lastRow}>
            <View style={styles.day}>
              <Text>Saturday</Text>
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
  day: {
    flex: 1,
    backgroundColor: 'yellow',
    padding: 5,
    margin: 5,
  },
});
