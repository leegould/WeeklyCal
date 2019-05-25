import React from 'react';
import { View, Switch, StyleSheet, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment, { Moment } from 'moment';
import { CalendarsState, OptionsState, Calendar } from '../types';

type Props = {
    navigation: {
        getParam: Function,
        navigate: Function,
    }
    data: CalendarsState,
    options: OptionsState,
    onFetchCalendars: Function,
    onChangeDate: Function,
    onToggleShowAllAndUpdateWeek: Function,
    onToggleCalendarAndUpdateWeek: Function,
    onToggleResetDateOption: Function,
    onToggleEventColorOptionAndUpdateWeek: Function,
    onToggleDayAddLinkAndUpdateWeek: Function,
    onToggleRollingWeek: Function,
};

type State = {
    anim: Animated.Value,
    selectedDate: Moment,
};

export default class Options extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Options',
    };

    constructor(props: Props) {
        super(props);

        const selectedDate = (this.props.navigation.getParam('date', moment()) as Moment).hours(10).minute(0).second(0);

        this.state = {
            anim: new Animated.Value(this.props.data.showAll ? 0 : 1),
            selectedDate,
        };

        try {
            props.onFetchCalendars();
        }
        catch (err) {
            console.log('Options.componentDidMount.error', err);
        }
    }

    toggleAllDay() {
        if (this.props && this.props.data.showAll) {
            this.show();
        } else {
            this.hide();
        }
        this.props.onToggleShowAllAndUpdateWeek();
        // this.props.onToggleShowAll();
        // this.props.onChangeDate(this.state.selectedDate, this.props.data.showAll, this.props.data.selectedCalendars);
    }

    toggleCalendar(item: Calendar) {
        this.props.onToggleCalendarAndUpdateWeek(item);
        // TODO : how to get selected date? pass in?
        // this.props.onChangeDate(this.state.selectedDate, this.props.data.showAll, this.props.data.selectedCalendars);
    }

    show() {
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 250,
        }).start()
    }

    hide() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 250,
        }).start()
    }

    render() {
        // console.log('Options.render.data', this.props.data);

        return (
            <View style={{ flex: 1,  backgroundColor: 'gray', justifyContent: 'flex-start' }}>
                {!this.props.data.isFetching &&
                <View style={{ flex: 1, marginBottom: 5 }}>
                    <ListItem
                        key={'resetDate'}
                        title={'Allow Date Reset'}
                        subtitle={'Hold down the calendar picker in the header to reset to todays date'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.props.onToggleResetDateOption()}
                                value={this.props.options.resetDate}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                    />
                    <ListItem
                        key={'eventColor'}
                        title={'Event Colours'}
                        subtitle={'Display the calendar colour next to the event'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.props.onToggleEventColorOptionAndUpdateWeek()}
                                value={this.props.options.eventColor}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                    />
                    <ListItem
                        key={'dayAddLink'}
                        title={'Add Link Per Day'}
                        subtitle={'Choose if each day should display an add event shortcut'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.props.onToggleDayAddLinkAndUpdateWeek()}
                                value={this.props.options.dayAddLink}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                    />
                    <ListItem
                        key={'rollingWeek'}
                        title={'Rolling Week'}
                        subtitle={'The first day shown of the week should be the selected day'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.props.onToggleRollingWeek()}
                                value={this.props.options.rollingWeek}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                    />
                    <ListItem
                        key={'showAll'}
                        title={'Show All Calendars'}
                        subtitle={'Display events from all calendars, or choose specific ones'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.toggleAllDay()}
                                value={this.props.data.showAll}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                    />
                    <Animated.FlatList
                        style={{ opacity: this.state.anim }}
                        data={this.props.data.allCalendars}
                        scrollEnabled={false}
                        renderItem={({item}: {item: Calendar}) => {
                                return(
                                    <ListItem
                                        key={item.id}
                                        title={item.title}
                                        subtitle={item.source}
                                        rightAvatar={
                                            <Switch
                                                onValueChange={() => this.toggleCalendar(item)}
                                                // this.props.data.selectedCalendars.findIndex(x => x.id === item.id) > -1
                                                value={this.props.data.selectedCalendars.indexOf(item.id) > -1}
                                                // trackColor={{true: '#C2272D', false: ''}}
                                                trackColor={{true: item.color, false: item.color}}
                                                style={styles.switchInput}
                                            />
                                        }
                                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
                                        titleStyle={{ color: 'white' }}
                                        subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
                                    />
                                );
                            }
                        }
                        keyExtractor={(item: Calendar, index: number) => item.id}
                    />
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    switchInput: {
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
    },
});
