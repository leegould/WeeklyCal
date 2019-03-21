import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Moment } from 'moment';

type Props = {
    day: Moment,
};

export default class CalendarModal extends PureComponent<Props> {
    render() {
        console.log('CalendarModal.render', this.props);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Calendar
                    current={this.props.day.date()}
                    onDayPress={(day: any) => {console.log('selected day', day)}}
                />
            </View>
        );
    }
}
