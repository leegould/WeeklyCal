import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import moment, { Moment } from 'moment';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import { CalendarsState, OptionsState, Calendar } from '../types';
import SwitchOption from './SwitchOption';

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
    onToggleRollingWeekAndUpdateWeek: Function,
    onToggleInlineAddAndUpdateWeek: Function,
    onToggleEventRowBorderAndUpdateWeek: Function,
    date: Moment,
};

type State = {
    anim: Animated.Value,
    selectedDate: Moment,
};

export class Options extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Options',
    };

    constructor(props: Props) {
        super(props);

        const selectedDate = moment(props.date).hours(10).minute(0).second(0);

        this.state = {
            anim: new Animated.Value(this.props.data.showAll ? 0 : 1),
            selectedDate,
        };

        try {
            props.onFetchCalendars();
        }
        catch (err) {
            console.warn('Options.componentDidMount.error', err);
        }
    }

    toggleAllDay = () => {
        if (this.props && this.props.data.showAll) {
            this.show();
        } else {
            this.hide();
        }
        this.props.onToggleShowAllAndUpdateWeek();
    }

    toggleCalendar(item: Calendar) {
        this.props.onToggleCalendarAndUpdateWeek(item);
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
        return (
            <View style={{ flex: 1,  backgroundColor: 'gray', justifyContent: 'flex-start' }}>
                {!this.props.data.isFetching &&
                <ScrollView style={{ flex: 1, marginBottom: 5 }}>
                    <SwitchOption
                        title='Allow Date Reset'
                        subtitle='Hold down the calendar picker in the header to reset to todays date'
                        value={this.props.options.resetDate}
                        onValueChange={this.props.onToggleResetDateOption}
                    />
                    <SwitchOption
                        title='Event Colours'
                        subtitle='Display the calendar colour next to the event'
                        value={this.props.options.eventColor}
                        onValueChange={this.props.onToggleEventColorOptionAndUpdateWeek}
                    />
                    <SwitchOption
                        title='Add Link Per Day'
                        subtitle='Choose if each day should display an add event shortcut'
                        value={this.props.options.dayAddLink}
                        onValueChange={this.props.onToggleDayAddLinkAndUpdateWeek}
                    />
                    <SwitchOption
                        title='Rolling Week'
                        subtitle='The first day shown of the week should be the selected day'
                        value={this.props.options.rollingWeek}
                        onValueChange={this.props.onToggleRollingWeekAndUpdateWeek}
                    />
                    <SwitchOption
                        title='Inline Add'
                        subtitle='Allow quick adding of an event for each day'
                        value={this.props.options.inlineAdd}
                        onValueChange={this.props.onToggleInlineAddAndUpdateWeek}
                    />
                    <SwitchOption
                        title='Event Line Separators'
                        subtitle='Divide events in each day with a line'
                        value={this.props.options.eventRowBorder}
                        onValueChange={this.props.onToggleEventRowBorderAndUpdateWeek}
                    />
                    <SwitchOption
                        title='Show All Calendars'
                        subtitle='Display events from all calendars, or choose specific ones'
                        value={this.props.data.showAll}
                        onValueChange={this.toggleAllDay}
                    />
                    <Animated.FlatList
                        style={{ opacity: this.state.anim }}
                        data={this.props.data.allCalendars}
                        scrollEnabled={false}
                        renderItem={({item}: {item: Calendar}) => {
                                return(
                                    <SwitchOption
                                        title={item.title}
                                        subtitle={item.source}
                                        value={this.props.data.selectedCalendars.indexOf(item.id) > -1}
                                        onValueChange={() => this.toggleCalendar(item)}
                                        trackColor={item.color}
                                    />
                                );
                            }
                        }
                        keyExtractor={(item: Calendar, index: number) => item.id}
                    />
                </ScrollView>
                }
            </View>
        );
    }
}

export default withMappedNavigationParams()(Options);
