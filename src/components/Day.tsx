import React, {Component} from 'react';
import { StyleSheet, View, Text, FlatList, Animated, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';
import { Day, OptionsState } from '../types';
import { CalendarEventReadable } from 'react-native-calendar-events';

type Props = {
    isFetching: boolean,
    day: Day,
    isToday?: boolean,
    options: OptionsState,
    navigation: {
        navigate: Function,
    }
};

type State = {
    fade: Animated.Value,
};

export default class DayEvents extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fade: new Animated.Value(1),
        }
    }

    componentDidUpdate() {
        if (this.props.isFetching) {
            this.fadeOut();
        } else {
            this.fadeIn();
        }
    }

    fadeIn() {
        this.state.fade.setValue(0);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 1,                   
                duration: 500,              
            }
        ).start();
    }

    fadeOut() {
        this.state.fade.setValue(1);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 0,                   
                duration: 750,              
            }
        ).start();
    }

    onAdd() {
        this.props.navigation.navigate('Event', { date: moment(this.props.day.date) });
    }

    onEdit(item: CalendarEventReadable) {
        const { startDate } = item;
        this.props.navigation.navigate('Event', { date: moment(startDate), event: item })
    }

    render() {
        // console.log('Day.render', this.props.day, this.state.events);

        return(
            <Animated.View style={[styles.container, {opacity: this.state.fade}]}>
                {this.props.options.dayAddLink &&
                <TouchableHighlight onPress={() => this.onAdd()} underlayColor={'beige'} hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
                    <View style={styles.row}>
                        <Animated.Text style={[styles.header, {opacity: this.state.fade}]}>{`${moment(this.props.day.date).format('ddd')} ${moment(this.props.day.date).format('DD')}`}</Animated.Text>
                        <Icon name='calendar-plus' type='material-community' color='green' onPress={() => this.onAdd()} size={18} />
                    </View>
                </TouchableHighlight>
                }
                {!this.props.options.dayAddLink &&
                <View style={styles.row}>
                    <Animated.Text style={[styles.header, {opacity: this.state.fade}]}>{`${moment(this.props.day.date).format('ddd')}`}</Animated.Text>
                    <Animated.Text style={[styles.header, {opacity: this.state.fade}]}>{`${moment(this.props.day.date).format('DD')}`}</Animated.Text>                   
                </View>
                }
                {this.props.day.events && 
                    <FlatList
                        data={this.props.day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            // console.log('Day.item', item);
                            return(
                                <TouchableOpacity onPress={
                                    () => this.onEdit(item)
                                }>
                                    <Animated.View style={[styles.eventContainer, {opacity: this.state.fade}]}>
                                        {this.props.options.eventColor &&
                                        <View style={[styles.eventCalendar, { backgroundColor: item.calendar ? item.calendar.color : 'transparent' }]} />
                                        }
                                        <Text style={styles.eventTitle}>
                                            {item.title}
                                        </Text>
                                    </Animated.View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                }
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'grey',
        borderBottomWidth: 0.5,
        marginBottom: 5,
    },
    header: {
        color: 'gray',
    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 2,
        padding: 2,
    },
    eventCalendar: {
        width: 5,
        height: 5,
        borderRadius: 2,
        marginRight: 3,
    },
    eventTitle: {
        color: 'gray',
    },
});
