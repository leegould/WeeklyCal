import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { calendarEvent } from '../reducers/week';
import { Moment } from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'grey',
        borderBottomWidth: 1,
    }
});

type Props = {
    day: {
        date: Moment,
        events: calendarEvent[],
    },
    isToday?: boolean,
};

// type State = {
//     day: Moment,
//     events: calendarEvent[],
// }

export default class Day extends Component<Props> {
    // static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    //     if(nextProps.day !== prevState.day){
    //         const events = await RNCalendarEvents.fetchAllEvents(
    //             nextProps.day.clone().startOf(),
    //             nextProps.day.clone().endOf()
    //         );
    //         console.log('getDerivedStateFromProps', nextProps.day.date.format('DD-MM-YYYY'), prevState.day.format('DD-MM-YYYY'), events);

    //         return { 
    //             day: nextProps.day,
    //             events,
    //         };
    //      }
    //      else return null;
    // }

    // constructor(props: Props) {
    //     super(props);
    //     this.state = {
    //         day: props.day,
    //         events: [],
    //     }
    // }

    // async componentDidMount() {
    //     try {
    //         const events = await RNCalendarEvents.fetchAllEvents(
    //             this.props.day.clone().startOf(),
    //             this.props.day.clone().endOf()
    //         );
            
    //         await this.setState({events});
    //     } catch (err) {
    //         console.log('componentDidMount.error', err);
    //     }
    // }

    render() {
        console.log('Day.render', this.props.day.date.format('DD-MM-YYYY'));
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.day.date.format('dddd')}</Text>
                    <Text>{this.props.day.date.format('DD')}</Text>
                </View>
                {this.props.day.events && 
                    <FlatList
                        data={this.props.day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            // console.log('item', item);
                            return(<Text>{item.title}</Text>);
                        }}
                    />
                }
            </View>
        );
    }
}

