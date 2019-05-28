import React from 'react';
import { TextInput, View, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CalendarEvent } from '../types';

export interface Props {
    date: Date,
    onAddEvent: Function,
    // onEditEvent: Function,
    // onDeleteEvent: Function,
};

interface State { 
    anim: Animated.Value;
}

interface Values {
    title: string;
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

                        this.props.onAddEvent(inlineEvent); // TODO .. does this add itself? needs container or passed in?
                        
                        formikActions.setSubmitting(false); // turn off disabled

                        formikActions.resetForm();
                        // this.props.navigation.goBack();
                    }, 500);
                }}
            >
                {props => (
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={props.handleChange('title')}
                            onBlur={(e) => {
                                const fieldName = 'title';
                                props.handleBlur(fieldName);

                                setTimeout(() => {
                                    if (props.dirty) {
                                        const { errors } = props;
                                        const isError = errors[fieldName];

                                        if (isError) {
                                            console.log('validation error', errors);
                                            return;
                                        }

                                        console.log('submitting');
                                        // props.submitForm();
                                    }
                                }, 0);
                            }}
                            value={props.values.title}
                            placeholder="New Event.."
                            autoFocus
                        />
                        {props.values.title && props.errors.title ?
                        <Icon containerStyle={styles.icon} name={`calendar-alert`} type='material-community' color='#C2272D' size={16} />
                        : null }
                    </View>
                )}
            </Formik>
        );
    }
}

export default Inline;

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0.5,
        borderColor: 'grey',
        flexDirection: 'row',
    },
    errorText: {
        color: '#C2272D',
        paddingHorizontal: 5,
        
    },
    textInput: {
        flex: 1,
        color: 'darkgray',
        height: 20,
        backgroundColor: 'beige',
        paddingHorizontal: 5,
        marginTop: 5,
    },
    icon: {
        marginTop: 5,
    }
});

