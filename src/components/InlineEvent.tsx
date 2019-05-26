import React from 'react';
import { TextInput, View, Text, StyleSheet, Animated } from 'react-native';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CalendarEvent } from '../types';

export interface Props {
    // navigation: {
    //     getParam: Function,
    //     goBack: Function,
    // },
    date: Date,
    // event?: CalendarEvent,
    onAddEvent: Function,
    // onEditEvent: Function,
    // onDeleteEvent: Function,
};

interface State { 
    anim: Animated.Value;
}

interface Values {
    title: string;
    // allDay: boolean; // This doesn't work for updating the form when the value changes
};

const ValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
});

class Inline extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Add Event',
    };

    render() {
        const { date } = this.props;
        // const date = (this.props.navigation.getParam('date', moment()) as Moment).hours(10).minute(0).second(0);
        // const event = (this.props.navigation.getParam('event', '') as CalendarEvent);
        // const existingId = event ? event.id : 0;
        // const allowsUpdate = event && event.calendar ? event.calendar.allowsModifications : true;

        return (
            <Formik
                initialValues={{
                    title: '' // event && event.title ? event.title : '',
                    // startDate: event && event.startDate ? moment(event.startDate) : moment(date),
                    // endDate: event && event.endDate ? moment(event.endDate) : moment(date),
                    // allDay: true,
                }}
                validationSchema={ValidationSchema}
                onSubmit={(values: Values, formikActions) => {
                    console.log('values', values);
                    setTimeout(() => {
                        const inlineEvent: CalendarEvent = {
                            title: values.title,
                            startDate: moment(date).startOf('day').toDate(),
                            endDate: moment(date).endOf('day').toDate(),
                            allDay: true,
                        };

                        // if (existingId) {
                        //     inlineEvent.id = existingId;
                        //     this.props.onEditEvent(inlineEvent);
                        // } else {
                            this.props.onAddEvent(inlineEvent); // TODO .. does this add itself? needs container or passed in?
                        // }
                        
                        formikActions.setSubmitting(false); // turn off disabled

                        // this.props.navigation.goBack();
                    }, 500);
                }}
            >
                {props => (
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                            value={props.values.title}
                            placeholder="Title"
                            autoFocus
                        />
                        {/* {props.touched.title && props.errors.title ?
                        <Text style={styles.errorText} >
                            {props.errors.title}
                        </Text>
                        : null } */}
                    </View>
                )}
            </Formik>
        );
    }
}

export default Inline;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // marginHorizontal: 40
    },
    errorText: {
        color: '#C2272D',
        paddingHorizontal: 5,
    },
    textInput: {
        color: 'darkgray',
        height: 40,
        backgroundColor: 'beige',
        paddingHorizontal: 5,
    },
});

