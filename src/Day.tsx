import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Moment } from 'moment';

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
};

export default class Day extends PureComponent<Props> {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.date.format('dddd')}</Text>
                    <Text>{this.props.date.format('DD')}</Text>
                </View>
            </View>
        );
    }
}

