import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Animated } from 'react-native';
import { WeekState } from '../types';
import Day from './Day';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState
};

type State = {
    fade: Animated.Value,
};

export default class Week extends PureComponent<Props, State> {
    static navigationOptions = {
        header: null,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            fade: new Animated.Value(0),
        }
    }

    fadeIn() {
        this.state.fade.setValue(0);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 1,                   
                duration: 500,              
            }
        ).start();
    }

    fadeOut() {
        this.state.fade.setValue(1);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 0,                   
                duration: 500,              
            }
        ).start();
    }

    render() {

        if (this.props.data.isFetching) {
            this.fadeOut();
        } else {
            this.fadeIn();
        }

        console.log('props', this.props);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log('onPress', this.props.data.week.days[0]);
                        this.props.navigation.navigate('Calendar', { day: this.props.data.week.days[0].date });
                    }}>
                        <Animated.Text style={[styles.headerText, {opacity: this.state.fade}]}>
                            {this.props.data.week.days[0].date.date()} - {this.props.data.week.days[6].date.date()}
                        </Animated.Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>{this.props.data.week.days[0].date.format('MMM')}</Text>
                    <Text style={styles.headerText}>{this.props.data.week.days[0].date.format('YYYY')}</Text>
                    <Button
                        title="Opt"
                        onPress={() => this.props.navigation.navigate('Options')}
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.firstRow}>
                        <Day day={this.props.data.week.days[0]} isToday isFetching={this.props.data.isFetching} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Day day={this.props.data.week.days[1]} isFetching={this.props.data.isFetching} />
                            <Day day={this.props.data.week.days[3]} isFetching={this.props.data.isFetching} />
                            <Day day={this.props.data.week.days[5]} isFetching={this.props.data.isFetching} />
                        </View>
                        <View style={styles.col}>
                            <Day day={this.props.data.week.days[2]} isFetching={this.props.data.isFetching} />
                            <Day day={this.props.data.week.days[4]} isFetching={this.props.data.isFetching} />
                            <Day day={this.props.data.week.days[6]} isFetching={this.props.data.isFetching} />
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
