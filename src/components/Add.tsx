import React from 'react';
import {TextInput, View, Button, Text} from 'react-native';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface Props {
    navigation: {
        getParam: Function,
    },
    onAddEvent: Function,
};

interface State {
    description: string,
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
        }
    }

    render() {
        const { navigation } = this.props;
        const date = navigation.getParam('date', moment());

        return (
            <View style={{flex: 1, backgroundColor: 'lightgray'}}>
                <Formik
                    initialValues={{ description: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values: Values, formikActions) => {
                        setTimeout(() => {
                            this.props.onAddEvent({
                                title: values.description,
                                startDate: date.toISOString(),
                                endDate: date.toISOString(),
                            });
                            
                            formikActions.setSubmitting(false); // turn off disabled

                            // TODO : close screen on success..
                        }, 500);
                    }}
                >
                    {props => (
                        <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
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
            </View>
        );
    }
}