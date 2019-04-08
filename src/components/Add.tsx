import React from 'react';
import {TextInput, View, Button, Text} from 'react-native';
import { Moment } from 'moment';
import { Formik } from 'formik';

export interface Props {
    date: Moment,
};

interface State {
    description: string,
};

interface Values {
    description: string;
};

export default class Add extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Add Event',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            description: '',
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'lightgray'}}>
                <Formik
                    initialValues={{ description: '' }}
                    validate={(values: Values) => {
                        let errors: Values = {
                            description: ''
                        };
                        if (!values.description) {
                          errors.description = 'Required';
                        }
                        return errors;
                    }}
                    // onSubmit={(values: Values, formikActions) => {
                    //     console.log('onSubmit.1,', values);
                    //     setTimeout(() => {
                    //       console.log('onSubmit', JSON.stringify(values));
                    //       // Important: Make sure to setSubmitting to false so our loading indicator
                    //       // goes away.
                    //       formikActions.setSubmitting(false);
                    //     }, 3500);
                    // }}
                    onSubmit={(values: Values) => console.log('onSubmit', values)}
                >
                    {props => (
                        <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
                            <Text style={{ marginBottom: 20, color: 'grey' }}>
                                Description
                            </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'orange'}}
                                onChangeText={props.handleChange('description')}
                                onBlur={props.handleBlur('description')}
                                value={props.values.description}
                            />
                            {props.touched.description && props.errors.description ?
                            <Text style={{ color: 'red' }} >
                                {props.errors.description}
                            </Text>
                            : null }
                            <Button
                                onPress={() => {console.log('test', props.values, props); props.handleSubmit(); }}
                                title="Add"
                            />
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}