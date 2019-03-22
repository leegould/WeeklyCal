import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { CalendarEvent } from './shared';
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
    day: Moment,
    isToday?: boolean,
};

type State = {
    events: CalendarEvent[],
}

export default class Day extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    async componentDidMount() {
        try {
            const events = await RNCalendarEvents.fetchAllEvents(
                this.props.day.clone().startOf(),
                this.props.day.clone().endOf()
            );
            
            await this.setState({events});
        } catch (err) {
            console.log('componentDidMount.error', err);
        }
    }

    render() {
        // console.log('Day.render', this.props.day, this.state.events);
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.day.format('dddd')}</Text>
                    <Text>{this.props.day.format('DD')}</Text>
                </View>
                {this.state.events && 
                    <FlatList
                        data={this.state.events}
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

