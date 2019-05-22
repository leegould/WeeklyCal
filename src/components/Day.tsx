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
    },
    onExpand: Function,
    expanded?: boolean,
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
        const { day, options, expanded } = this.props;

        return(
            <Animated.View style={[styles.container, {opacity: this.state.fade}]}>
                <TouchableHighlight onPress={() => options.dayAddLink && this.onAdd()} underlayColor={'beige'} hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
                    <View style={styles.row}>
                        {options.dayAddLink &&
                        <Icon name='calendar-plus' type='material-community' color='green' onPress={() => this.onAdd()} size={expanded ? 24 : 18} />
                        }
                        <Animated.Text style={[styles.header, { fontSize: expanded ? 20 : 14 , opacity: this.state.fade}]}>{`${moment(day.date).format('ddd')} ${moment(day.date).format('DD')}`}</Animated.Text>
                        <Icon name={`arrow-${expanded ? 'collapse' : 'expand'}`} type='material-community' color='green' onPress={() => this.props.onExpand(day)} size={expanded ? 24 : 18} />
                    </View>
                </TouchableHighlight>
                {day.events && 
                    <FlatList
                        data={day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            // console.log('Day.item', item);
                            return(
                                <TouchableOpacity onPress={
                                    () => this.onEdit(item)
                                }>
                                    <Animated.View style={[styles.eventContainer, {opacity: this.state.fade}]}>
                                        {options.eventColor &&
                                        <View style={[styles.eventCalendar, { backgroundColor: item.calendar ? item.calendar.color : 'transparent' }]} />
                                        }
                                        <Text style={[styles.eventTitle, { fontSize: expanded ? 18 : 14 }]}>
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
