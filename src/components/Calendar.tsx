import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';
import { WeekState } from '../types';

type Props = {
    navigation: {
        dispatch: Function,
    },
    data: WeekState,
    onChangeDate: Function,
};

export default class CalendarModal extends PureComponent<Props> {
    static navigationOptions = {
        headerTitle: 'Week Start',
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Calendar
                    current={this.props.data.week.days[0].date.format('YYYY-MM-DD')}
                    onDayPress={(day: any) => {
                        // console.log('Calendar.onDayPress', day)
                        this.props.onChangeDate(moment(day.dateString));
                        const backAction = NavigationActions.back();
                        this.props.navigation.dispatch(backAction);
                    }}
                />
            </View>
        );
    }
}
