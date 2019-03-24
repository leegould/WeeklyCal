import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment, { Moment } from 'moment';
import { NavigationActions } from 'react-navigation';

type Props = {
    navigation: {
        dispatch: Function,
    },
    week: {
        days: Moment[],
    },
    onChangeDate: Function,
};

export default class CalendarModal extends PureComponent<Props> {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Calendar
                    current={this.props.week.days[0].format('YYYY-MM-DD')}
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
