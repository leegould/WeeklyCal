import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Icon } from 'react-native-elements';

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
            date: props.date, //.startOf('day').add(12, 'hours'),
            isDateTimePickerVisible: false,
        }
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date: Date) => {
        console.log('A date has been picked: ', date);
        this.setState({ date: moment(date) });
        this.hideDateTimePicker();
        this.props.onDateChanged(moment(date));
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.showDateTimePicker as any}
                    title={this.state.date.format(this.props.showTime ? 'DD-MM-YYYY' : 'DD-MM-YY HH:mm')}
                    titleStyle={styles.title}
                    icon={<Icon name='calendar' type='material-community' color='#C2272D' size={18} />}
                    type='solid'
                    buttonStyle={styles.button}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={this.state.date.toDate()}
                    mode={this.props.showTime ? 'date' : 'datetime'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
    button: {
        backgroundColor: 'lightgray',
        borderWidth: 0
    },
    title: {
        marginLeft: 5,
        color: 'white',
        fontSize: 14
    },
});
