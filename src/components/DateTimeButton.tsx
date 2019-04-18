import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import moment, { Moment } from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

export interface Props {
    date: Moment,
    showTime: boolean,
    onDateChanged: Function,
};

interface State {
    date: Moment,
    isDateTimePickerVisible: boolean,
};

export default class DateTimeButton extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            date: props.date.startOf('day').add(12, 'hours'),
            isDateTimePickerVisible: false,
        }
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date: Date) => {
        console.log('A date has been picked: ', date);
        this.setState({ date: moment(date) });
        this.hideDateTimePicker();
        this.props.onDateChanged(date);
    };

    render() {
        return (
            <TouchableOpacity onPress={this.showDateTimePicker}>
                <Text>
                    {this.state.date.format(this.props.showTime ? 'DD MM YYYY' : 'DD MM YYYY - HH:mm')}
                </Text>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={this.state.date.toDate()}
                    mode={this.props.showTime ? 'date' : 'datetime'}
                />
            </TouchableOpacity>
        );
    }
}