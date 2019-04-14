import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
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
        const { data, navigation } = this.props;

        // console.log('props', this.props);
        // const startDate = data.week.days[0].date;
        // const endDate = data.week.days[6].date;

        return (
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <Icon name='settings-applications' type='material' color='lightgray' onPress={() => navigation.navigate('Options')} size={40} />
                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('Calendar', { day: startDate }); }}>
                        <View style={styles.headerMiddle}>
                            <Animated.Text style={[styles.headerText, {opacity: this.state.fade}]}>
                                {`${startDate.date()} - ${endDate.date()} ${startDate.format('MMM')} ${startDate.format('YYYY')}`}
                            </Animated.Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Icon name='calendar-range' type='material-community' color='lightgray' onPress={() => navigation.navigate('Calendar', { day: startDate })} size={40} />
                </View> */}
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
        marginTop: 40,
        marginBottom: 40,
    },
    // header: {
    //     height: 50,
    //     backgroundColor: '#C2272D',
    //     padding: 5,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // headerText: {
    //     color: '#C2272D',
    //     fontSize: 16,
    //     justifyContent: 'center',
    // },
    // headerMiddle: {
    //     paddingHorizontal: 15,
    //     paddingVertical: 5,
    //     borderRadius: 5,
    //     backgroundColor: 'lightgray',
    //     justifyContent: 'center',
    //     fontWeight: 'bold',
    // },
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
