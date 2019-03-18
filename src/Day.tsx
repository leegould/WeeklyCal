import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { Moment } from 'moment';
import CalendarEvent from './shared';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'grey',
        borderBottomWidth: 1,
    }
});

type Props = {
    date: Moment,
    events?: CalendarEvent[],
};

export default class Day extends PureComponent<Props> {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.date.format('dddd')}</Text>
                    <Text>{this.props.date.format('DD')}</Text>
                </View>
                {this.props.events && 
                    <FlatList
                        data={this.props.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            console.log('item', item);
                            return(<Text>{item.title}</Text>);
                        }}
                    />
                }
            </View>
        );
    }
}

