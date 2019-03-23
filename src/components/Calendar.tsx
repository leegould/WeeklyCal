import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Moment } from 'moment';
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
        console.log('CalendarModal.render', this.props);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Calendar
                    current={this.props.week.days[0].date()}
                    onDayPress={(day: any) => {
                        this.props.onChangeDate(day);
                        const backAction = NavigationActions.back();
                        this.props.navigation.dispatch(backAction);
                        console.log('selected day', day)
                    }}
                />
            </View>
        );
    }
}
