import React from 'react';
import {TextInput, View} from 'react-native';
import { Moment } from 'moment';

export interface Props {
    date: Moment,
};

interface State {
    description: string,
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
    
    onChange(text: string) {
        console.log('Add.onChange', text, this.props.date);
        this.setState({
            description: text,
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'row' }}>
                <TextInput
                    style={{height: 40, flex: 1, marginHorizontal: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.onChange(text)}
                    value={this.state.description}
                />
            </View>
        );
    }
}