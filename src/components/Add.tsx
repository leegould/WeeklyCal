import React from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CalendarEvent } from '../types';
import DateTimeButton from './DateTimeButton';
import { Button, Icon, CheckBox } from 'react-native-elements';

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
            endDate = previousState.startDate.clone().add(1, 'hours');
            console.log('endDate', previousState.startDate, endDate);
        }

        return ({
            allDay: !previousState.allDay,
            endDate,
        });
    });

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'gray'}}>
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
                        <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40, backgroundColor: 'lightgray' }}>
                            <CheckBox
                                right
                                title='All Day'
                                onPress={this.toggleAllDay}
                                checked={this.state.allDay}
                                iconRight
                                checkedColor='#C2272D'
                                textStyle={{ color:'white' }}
                                containerStyle={{ backgroundColor: 'lightgray', padding: 0, justifyContent: 'flex-end', borderColor: 'lightgray' }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <DateTimeButton
                                showTime={this.state.allDay}
                                date={this.state.startDate}
                                onDateChanged={(date: Moment) => this.setState({startDate: date})}
                            />
                            {!this.state.allDay && this.state.endDate &&
                                <Text style={{ color: 'white' }}>-</Text>
                            }
                            {!this.state.allDay && this.state.endDate &&
                                <DateTimeButton
                                    showTime={this.state.allDay}
                                    date={this.state.endDate}
                                    onDateChanged={(date: Moment) => this.setState({endDate: date})}
                                />
                            }
                            </View>
                            <TextInput
                                style={{ color: 'darkgray', height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'beige', padding: 5 }}
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
                                title='Add'
                                raised
                                disabled={props.isSubmitting}
                                style={{ backgroundColor: 'lightgray' }}
                                titleStyle={{ marginLeft: 5, color: 'white', fontSize: 16 }}
                                icon={<Icon name='calendar-plus' type='material-community' color='#C2272D' size={20} />}
                                type='solid'
                                buttonStyle={{ backgroundColor: 'lightgray', borderWidth: 0 }}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}