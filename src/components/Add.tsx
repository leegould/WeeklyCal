import React from 'react';
import {TextInput, View, Button, Text, TouchableOpacity} from 'react-native';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CalendarEvent } from '../types';
import DateTimeButton from './DateTimeButton';

export interface Props {
    navigation: {
        getParam: Function,
    },
    onAddEvent: Function,
};

interface State {
    title: string,
    startDate: Moment,
    endDate: Moment | null,
    allDay: boolean,
};

interface Values {
    title: string;
};

const ValidationSchema = Yup.object().shape({
    title: Yup.string()
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
            title: '',
            startDate: (props.navigation.getParam('date', moment()) as Moment).startOf('day').add(12, 'hours'),
            endDate: null,
            allDay: true,
        }
    }

    toggleAllDay = () => this.setState((previousState) => {
        let endDate = null;
        if (previousState.allDay) {
            endDate = previousState.startDate.clone().add(1, 'hour');
            console.log('endDate', endDate);
        }

        return ({
            allDay: !previousState.allDay,
            endDate,
        });
    });

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'lightgray'}}>
                <Formik
                    initialValues={{ title: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values: Values, formikActions) => {
                        setTimeout(() => {
                            const event: CalendarEvent = {
                                title: values.title,
                                startDate: this.state.startDate.toDate(),
                                endDate: null,
                                allDay: true,
                            };
                            if (!this.state.allDay && this.state.endDate) {
                                event.allDay = false;
                                event.endDate = this.state.endDate.toDate();
                            }

                            this.props.onAddEvent(event);
                            
                            formikActions.setSubmitting(false); // turn off disabled

                            // TODO : close screen on success..
                        }, 500);
                    }}
                >
                    {props => (
                        <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
                            <DateTimeButton showTime={this.state.allDay} date={this.state.startDate} onDateChanged={(date: Moment) => this.setState({startDate: date})} />
                            <TouchableOpacity onPress={this.toggleAllDay}>
                                <Text>{`All Day: ${this.state.allDay}`}</Text>
                            </TouchableOpacity>
                            {!this.state.allDay && this.state.endDate &&
                            <DateTimeButton showTime={this.state.allDay} date={this.state.endDate} onDateChanged={(date: Moment) => this.setState({endDate: date})} />
                            }
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'orange', padding: 5 }}
                                onChangeText={props.handleChange('title')}
                                onBlur={props.handleBlur('title')}
                                value={props.values.title}
                                placeholder="Title"
                            />
                            {props.touched.title && props.errors.title ?
                            <Text style={{ color: 'red' }} >
                                {props.errors.title}
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
            </View>
        );
    }
}