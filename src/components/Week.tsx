import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
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
                duration: 250,              
            }
        ).start();
    }

    fadeOut() {
        this.state.fade.setValue(1);
        Animated.timing(                  
            this.state.fade,            
            {
                toValue: 0,                   
                duration: 250,              
            }
        ).start();
    }

    render() {
        const { data, navigation } = this.props;

        // console.log('week.render', data);

        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.firstRow}>
                        <Day day={data.week.days[0]} isToday isFetching={data.isFetching} navigation={navigation} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Day day={data.week.days[1]} isFetching={data.isFetching} navigation={navigation} />
                            <Day day={data.week.days[3]} isFetching={data.isFetching} navigation={navigation} />
                            <Day day={data.week.days[5]} isFetching={data.isFetching} navigation={navigation} />
                        </View>
                        <View style={styles.col}>
                            <Day day={data.week.days[2]} isFetching={data.isFetching} navigation={navigation} />
                            <Day day={data.week.days[4]} isFetching={data.isFetching} navigation={navigation} />
                            <Day day={data.week.days[6]} isFetching={data.isFetching} navigation={navigation} />
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
        backgroundColor: 'gray',
        padding: 5,
        paddingTop: 0,
    },
    firstRow: {
        flex: 1,
        backgroundColor: 'gray',
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 0,
    },
    col: {
        flex: 1,
    },
});
