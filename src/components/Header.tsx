import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback, Text } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { WeekState, OptionsState } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    options: OptionsState,
    onChangeDate: Function,
};

type State = {
    fade: Animated.Value,
    isDateTimePickerVisible: boolean,
};

export default class Header extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fade: new Animated.Value(1),
            isDateTimePickerVisible: false,
        }
    }

    componentDidUpdate() {
        if (this.props.data.isFetching) {
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
                duration: 150,              
            }
        ).start();
    }

    fadeOut() {
        this.state.fade.setValue(1);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 0,                   
                duration: 150,              
            }
        ).start();
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date: Date) => {
        // console.log('A date has been picked: ', date);
        this.hideDateTimePicker();
        this.props.onChangeDate(moment(date), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars, this.props.options.rollingWeek);
    };

    handleLongPress = () => {
        if (this.props.options.resetDate) {
            // console.log('Resetting to today: ', moment);
            this.hideDateTimePicker();
            this.props.onChangeDate(moment(), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars, this.props.options.rollingWeek);
        } else {
            // console.log('Resetting disabled');
        }
    }

    render() {
        const startDate = moment(this.props.data.week.days[0].date);
        const endDate = moment(this.props.data.week.days[6].date);

        // console.log('header.render', this.props.options);

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Icon name='settings-applications' type='material' color='lightgray' onPress={() => this.props.navigation.navigate('Options', { date: startDate })} size={40} />
                    <TouchableWithoutFeedback onPress={this.showDateTimePicker} onLongPress={this.handleLongPress}>
                        <Animated.View style={[styles.headerMiddle, {opacity: this.state.fade}]}>
                            <Icon name='calendar-range' type='material-community' color='#C2272D' size={24} />
                            <Text style={styles.headerText}>
                                {`${startDate.date()} - ${endDate.date()} ${startDate.format('MMM')} ${startDate.format('YYYY')}`}
                            </Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <Icon name='calendar-plus' type='material-community' color='lightgray' onPress={() => this.props.navigation.navigate('Event', { date: startDate })} size={40} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        date={startDate.toDate()}
                        mode={'date'}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#C2272D',
    },
    header: {
        height: 50,
        backgroundColor: '#C2272D',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#C2272D',
        fontSize: 16,
        justifyContent: 'center',
        marginLeft: 5,
    },
    headerMiddle: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
    },
});
