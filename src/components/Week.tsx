import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import { dayState } from '../reducers/week' ;
import Day from './Day';

type Props = {
    navigation: {
        navigate: Function,
    }
    week: {
        days: dayState[],
    },
};

export default class Week extends PureComponent<Props> {
    static navigationOptions = {
        header: null,
    }

    render() {
        console.log('props', this.props);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {
                        // console.log('onPress');
                        this.props.navigation.navigate('Calendar', { day: this.props.week.days[0].date });
                    }}>
                        <Text style={styles.headerText}>{this.props.week.days[0].date.date()} - {this.props.week.days[6].date.date()}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>{this.props.week.days[0].date.format('MMM')}</Text>
                    <Text style={styles.headerText}>{this.props.week.days[0].date.format('YYYY')}</Text>
                    <Button
                        title="Opt"
                        onPress={() => this.props.navigation.navigate('Options')}
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.firstRow}>
                        <Day day={this.props.week.days[0]} isToday />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Day day={this.props.week.days[1]} />
                            <Day day={this.props.week.days[3]} />
                            <Day day={this.props.week.days[5]} />
                        </View>
                        <View style={styles.col}>
                            <Day day={this.props.week.days[2]} />
                            <Day day={this.props.week.days[4]} />
                            <Day day={this.props.week.days[6]} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        marginTop: 40,
        marginBottom: 40,
    },
    header: {
        height: 50,
        backgroundColor: 'purple',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        backgroundColor: 'orange',
        padding: 3,
        color: 'black',
    },
    midHeader: {
        backgroundColor: 'white',
    },
    rightHeader: {
        backgroundColor: 'white',
    },
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
        padding: 5,
        paddingTop: 0,
    },
    firstRow: {
        flex: 1,
        backgroundColor: 'grey',
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 0,
    },
    col: {
        flex: 1,
    },
});
