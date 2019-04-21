import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Icon, CheckBox } from 'react-native-elements';
import { CalendarEvent } from '../types';
import DateTimeButton from './DateTimeButton';

export interface Props {
    navigation: {
        getParam: Function,
    },
    onAddEvent: Function,
};

interface State { 
    allDay: boolean;
}

interface Values {
    title: string;
    startDate: Moment;
    endDate: Moment;
    // allDay: boolean; // This doesn't work for updating the form when the value changes
};

const ValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date().when('startDate', (st: Date) => {
        return Yup.date().min(st, 'Must be after start!');
    }),
});

export default class Add extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Add Event',
    };

    constructor(props: Props) {
        super(props);
        
        this.state = {
            allDay: true,
        };
    }

    toggleAllDay = () => this.setState((previousState: State) => ({
        allDay: !previousState.allDay,
    }));

    render() {
        const date = (this.props.navigation.getParam('date', moment()) as Moment).hours(10).minute(0).second(0);

        return (
            <View style={{flex: 1, backgroundColor: 'gray'}}>
                <Formik
                    initialValues={{
                        title: '',
                        startDate: moment(date).hours(10).minute(0).second(0),
                        endDate: moment(date).hours(16).minute(0).second(0),
                        // allDay: true,
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values: Values, formikActions) => {
                        console.log('values', values);
                        setTimeout(() => {
                            const event: CalendarEvent = {
                                title: values.title,
                                startDate: values.startDate.toDate(),
                                allDay: this.state.allDay,
                                endDate: undefined,
                            };
                            if (!this.state.allDay) {
                                event.allDay = false;
                                event.endDate = values.endDate.toDate();
                            }

                            this.props.onAddEvent(event);
                            
                            formikActions.setSubmitting(false); // turn off disabled

                            // TODO : close screen on success..
                        }, 500);
                    }}
                >
                    {props => (
                        <View style={styles.container}>
                            <View style={styles.subcontainer}>
                                <CheckBox
                                    right
                                    title='All Day'
                                    onPress={this.toggleAllDay}
                                    checked={this.state.allDay}
                                    iconRight
                                    checkedColor='#C2272D'
                                    textStyle={styles.text}
                                    containerStyle={styles.checkboxContainer}
                                />
                                <View style={styles.dateContainer}>
                                    <Text style={styles.text}>{this.state.allDay ? 'Date' : 'From'}</Text>
                                    <DateTimeButton
                                        showTime={this.state.allDay}
                                        date={props.values.startDate}
                                        onDateChanged={(date: Moment) => {
                                            props.handleChange('startDate');
                                            props.values.startDate = date;
                                            // this.setState({startDate: date});
                                        }}
                                    />
                                </View>
                                {props.touched.startDate && props.errors.startDate ?
                                <Text style={styles.errorText} >
                                    {props.errors.startDate}
                                </Text>
                                : null }
                                {!this.state.allDay &&
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.text}>To</Text>
                                        <DateTimeButton
                                            showTime={this.state.allDay}
                                            date={props.values.endDate}
                                            onDateChanged={(date: Moment) => {
                                                props.handleChange('endDate');
                                                props.values.endDate = date;
                                                // this.setState({endDate: date});
                                            }}
                                        />
                                    </View>
                                }
                                {!this.state.allDay && props.touched.endDate && props.errors.endDate ?
                                <Text style={styles.errorText} >
                                    {props.errors.endDate}
                                </Text>
                                : null }
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={props.handleChange('title')}
                                    onBlur={props.handleBlur('title')}
                                    value={props.values.title}
                                    placeholder="Title"
                                />
                                {props.touched.title && props.errors.title ?
                                <Text style={styles.errorText} >
                                    {props.errors.title}
                                </Text>
                                : null }
                                <Button
                                    onPress={props.handleSubmit as any}
                                    title='Add'
                                    disabled={props.isSubmitting}
                                    titleStyle={styles.buttonTitle}
                                    icon={<Icon name='calendar-plus' type='material-community' color='#C2272D' size={20} />}
                                    type='solid'
                                    buttonStyle={{ backgroundColor: 'lightgray', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 40
    },
    subcontainer: {
        backgroundColor: 'lightgray',
        paddingBottom: 5,
        borderRadius: 5
    },
    text: {
        color:'white'
    },
    errorText: {
        color: '#C2272D',
    },
    checkboxContainer: {
        backgroundColor: 'lightgray',
        padding: 0,
        justifyContent: 'flex-end',
        borderColor: 'lightgray'
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5
    },
    textInput: {
        color: 'darkgray',
        height: 40,
        backgroundColor: 'beige',
        padding: 5,
    },
    buttonTitle: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16
    },
    button: {
        backgroundColor: 'lightgray',
        borderWidth: 0
    },
});
