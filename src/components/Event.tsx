import React from 'react';
import { TextInput, View, Text, StyleSheet, Switch, Animated, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import moment, { Moment } from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Icon } from 'react-native-elements';
import { CalendarEvent } from '../types';
import DateTimeButton from './DateTimeButton';

export interface Props {
    navigation: {
        getParam: Function,
        goBack: Function,
    },
    onAddEvent: Function,
    onEditEvent: Function,
    onDeleteEvent: Function,
};

interface State { 
    allDay: boolean;
    anim: Animated.Value;
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
        
        const event = (this.props.navigation.getParam('event', '') as CalendarEvent);
        const allDay = event ? event.allDay : true;

        this.state = {
            allDay,
            anim: new Animated.Value(allDay ? 0 : 1),
        };
    }

    toggleAllDay = () => this.setState((previousState: State) => {
        if (!previousState.allDay) {
            this.hide();
        } else {
            this.show();
        }
        return {
            allDay: !previousState.allDay,
        }
    });

    show() {
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 250,
        }).start()
    }

    hide() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 250,
        }).start()
    }

    render() {
        const date = (this.props.navigation.getParam('date', moment()) as Moment).hours(10).minute(0).second(0);
        const event = (this.props.navigation.getParam('event', '') as CalendarEvent);
        const existingId = event.id;
        const allowsUpdate = event.calendar ? event.calendar.allowsModifications : true;

        return (
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#00000080'}} behavior='padding'>
                <TouchableOpacity 
                    style={{flex: 1}}
                    onPressOut={() => {this.props.navigation.goBack()}}
                >
                    <Formik
                        initialValues={{
                            title: event.title ? event.title : '',
                            startDate: event.startDate ? moment(event.startDate) : moment(date).hours(10).minute(0).second(0),
                            endDate: event.endDate ? moment(event.endDate) : moment(date).hours(16).minute(0).second(0),
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

                                if (existingId) {
                                    event.id = existingId;
                                    this.props.onEditEvent(event);
                                } else {
                                    this.props.onAddEvent(event);
                                }
                                
                                formikActions.setSubmitting(false); // turn off disabled

                                this.props.navigation.goBack();
                            }, 500);
                        }}
                    >
                        {props => (
                            <View style={styles.container}>
                                <View style={styles.subcontainer}>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.text}>All Day</Text>
                                        <Switch
                                            onValueChange={this.toggleAllDay}
                                            value={this.state.allDay}
                                            trackColor={{true: '#C2272D', false: ''}}
                                            style={styles.switchInput}
                                        />
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.text}>{this.state.allDay ? 'Date' : 'From'}</Text>
                                        <DateTimeButton
                                            showTime={this.state.allDay}
                                            date={props.values.startDate}
                                            onDateChanged={(date: Moment) => {
                                                props.handleChange('startDate');
                                                props.values.startDate = date;
                                            }}
                                        />
                                    </View>
                                    {props.touched.startDate && props.errors.startDate ?
                                    <Text style={styles.errorText} >
                                        {props.errors.startDate}
                                    </Text>
                                    : null }
                                    <Animated.View style={
                                        [styles.rowContainer,
                                            {
                                                opacity: this.state.anim,
                                                height: this.state.anim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 40]
                                                })
                                            }
                                        ]}
                                    >
                                        <Text style={styles.text}>To</Text>
                                        <DateTimeButton
                                            showTime={this.state.allDay}
                                            date={props.values.endDate}
                                            onDateChanged={(date: Moment) => {
                                                props.handleChange('endDate');
                                                props.values.endDate = date;
                                            }}
                                        />
                                    </Animated.View>
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
                                        autoFocus
                                    />
                                    {props.touched.title && props.errors.title ?
                                    <Text style={styles.errorText} >
                                        {props.errors.title}
                                    </Text>
                                    : null }
                                    <View style={styles.rowButtons}>
                                        {existingId && allowsUpdate &&
                                        <Button
                                            onPress={() => {
                                                console.log('onDeletePress', event);
                                                Alert.alert('Delete Event', 'Are you sure you want to delete this event?',
                                                [
                                                    {text: 'No', onPress: () => { console.log('cancelled'); }, style: 'cancel'},
                                                    {text: 'Yes', onPress: () => {
                                                        this.props.navigation.goBack();
                                                        this.props.onDeleteEvent(event);
                                                    }},
                                                ])
                                            }}
                                            title='Delete'
                                            titleStyle={styles.buttonTitle}
                                            icon={<Icon name='delete-forever' type='material-community' color='#C2272D' size={20} />}                                   
                                            type='solid'
                                            buttonStyle={styles.button}
                                        />
                                        }
                                        <Button
                                            onPress={() => this.props.navigation.goBack()}
                                            title='Cancel'
                                            titleStyle={styles.buttonTitle}
                                            icon={<Icon name='close-circle' type='material-community' color='#C2272D' size={20} />}                                   
                                            type='solid'
                                            buttonStyle={styles.button}
                                        />
                                        {allowsUpdate &&
                                        <Button
                                            onPress={props.handleSubmit as any}
                                            title={existingId ? 'Save' : 'Add'}
                                            disabled={props.isSubmitting}
                                            titleStyle={styles.buttonTitle}
                                            icon={<Icon name='calendar-plus' type='material-community' color='#C2272D' size={20} />}
                                            type='solid'
                                            buttonStyle={styles.button}
                                        />
                                        }
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        borderRadius: 5,
        paddingTop: 5,
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
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        height: 40,
    },
    switchInput: {
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
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
