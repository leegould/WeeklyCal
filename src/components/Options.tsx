import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { AllCalendarsState, Calendar } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: AllCalendarsState,
    onFetchCalendars: Function,
};

export default class Options extends React.PureComponent<Props> {
    static navigationOptions = {
        title: 'Options',
    };

    constructor(props: Props) {
        super(props);
        try {
            props.onFetchCalendars();
        }
        catch (err) {
            console.log('Options.componentDidMount.error', err);
        }
    }

    render() {
        console.log('Options.render.data', this.props.data);

        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'gray' }}>
                <Text>Options Screen</Text>
                {!this.props.data.isFetching &&
                <FlatList
                    data={this.props.data.allCalendars.calendars}
                    renderItem={({item}: {item: Calendar}) =>
                        <Text>{item.title}</Text>
                    }
                />
                }
            </View>
        );
    }
}