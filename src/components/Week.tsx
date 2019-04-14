import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'
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
            fade: new Animated.Value(1),
        }
    }

    componentDidUpdate() {
        if (this.props.data.isFetching) {
            this.fadeOut();
        } else {
            this.fadeIn();
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
        // console.log('props', this.props);
        const startDate = this.props.data.week.days[0].date;
        const endDate = this.props.data.week.days[6].date;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name='settings-applications' type='material' color='lightgray' onPress={() => this.props.navigation.navigate('Options')} size={40} />
                    <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Calendar', { day: startDate }); }}>
                        <View style={styles.headerMiddle}>
                            <Animated.Text style={[styles.headerText, {opacity: this.state.fade}]}>
                                {`${startDate.date()} - ${endDate.date()} ${startDate.format('MMM')} ${startDate.format('YYYY')}`}
                            </Animated.Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Icon name='calendar-range' type='material-community' color='lightgray' onPress={() => this.props.navigation.navigate('Calendar', { day: startDate })} size={40} />
                </View>
                <View style={styles.main}>
                    <View style={styles.firstRow}>
                        <Day day={this.props.data.week.days[0]} isToday isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Day day={this.props.data.week.days[1]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                            <Day day={this.props.data.week.days[3]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                            <Day day={this.props.data.week.days[5]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                        </View>
                        <View style={styles.col}>
                            <Day day={this.props.data.week.days[2]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                            <Day day={this.props.data.week.days[4]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
                            <Day day={this.props.data.week.days[6]} isFetching={this.props.data.isFetching} navigation={this.props.navigation} />
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
        backgroundColor: '#C2272D',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#C2272D',
        fontSize: 16,
        justifyContent: 'center',
    },
    headerMiddle: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        fontWeight: 'bold',
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
