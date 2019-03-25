import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { Day } from '../types';

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
    day: Day,
    isToday?: boolean,
};

export default class DayEvents extends Component<Props> {
    render() {
        // console.log('Day.render', this.props.day, this.state.events);
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.day.date.format('dddd')}</Text>
                    <Text>{this.props.day.date.format('DD')}</Text>
                </View>
                {this.props.day.events && 
                    <FlatList
                        data={this.props.day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            // console.log('item', item);
                            return(<Text>{item.title}</Text>);
                        }}
                    />
                }
            </View>
        );
    }
}

