import React from 'react';
import {TextInput, View, Button, Text, TouchableOpacity} from 'react-native';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from 'react-native-modal-datetime-picker';

export interface Props {
    navigation: {
        getParam: Function,
    },
    onAddEvent: Function,
};

interface State {
    description: string,
    startDate: Moment,
    isDateTimePickerVisible: boolean,
    allDay: boolean,
};

interface Values {
    description: string;
};

const ValidationSchema = Yup.object().shape({
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
});

export default class Add extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Add Event',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            description: '',
            startDate: props.navigation.getParam('date', moment()),
            isDateTimePickerVisible: false,
            allDay: true,
        }
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date: Date) => {
        console.log('A date has been picked: ', date);
        this.setState({ startDate: moment(date) });
        this.hideDateTimePicker();
    };

    toggleAllDay = () => this.setState((previousState) => ({ allDay: !previousState.allDay }));

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'lightgray'}}>
                <Formik
                    initialValues={{ description: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values: Values, formikActions) => {
                        setTimeout(() => {
                            this.props.onAddEvent({
                                title: values.description,
                                startDate: this.state.startDate.toISOString(),
                                endDate: this.state.startDate.toISOString(),
                            });
                            
                            formikActions.setSubmitting(false); // turn off disabled

                            // TODO : close screen on success..
                        }, 500);
                    }}
                >
                    {props => (
                        <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
                            <TouchableOpacity onPress={this.showDateTimePicker}>
                                <Text>
                                    {this.state.startDate.format('DD MM YYYY')}
                                </Text>
                                {!this.state.allDay &&
                                <Text>{this.state.startDate.format('HH:MM')}</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleAllDay}>
                                <Text>{`All Day: ${this.state.allDay}`}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'orange', padding: 5 }}
                                onChangeText={props.handleChange('description')}
                                onBlur={props.handleBlur('description')}
                                value={props.values.description}
                                placeholder="Description"
                            />
                            {props.touched.description && props.errors.description ?
                            <Text style={{ color: 'red' }} >
                                {props.errors.description}
                            </Text>
                            : null }
                            <Button
                                onPress={props.handleSubmit as any}
                                title="Add"
                                disabled={props.isSubmitting}
                            />
                        </View>
                    )}
                </Formik>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={this.state.startDate.toDate()}
                    mode={this.state.allDay ? 'date' : 'datetime'}
                />
            </View>
        );
    }
}