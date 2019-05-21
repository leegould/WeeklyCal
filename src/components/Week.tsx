import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { WeekState, OptionsState, Day } from '../types';
import DayComponent from './Day';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    options: OptionsState,
};

type State = {
    dayLayout: Animated.Value,
    selectedDay: Day | null,
};

export default class Week extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dayLayout: new Animated.Value(1),
            selectedDay: null,
        }
    }

    onSelectDay(day: Day) {
        // console.log('onSelectDay', day);
        this.setState((previousState:State) => {
            if (previousState.selectedDay === null) {
                Animated.timing(this.state.dayLayout, 
                {
                    toValue: 0,
                    duration: 250,
                }).start();
                return { selectedDay: day };

            } else {
                Animated.timing(this.state.dayLayout,
                {
                    toValue: 1,
                    duration: 250,
                }).start();
                return { selectedDay: null };
            }
        });
    }

    render() {
        const { data, navigation, options } = this.props;

        const invertedOpacity = this.state.dayLayout.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

        return (
            <View style={styles.container}>
                {!this.state.selectedDay &&
                <Animated.View style={[styles.main, { opacity: this.state.dayLayout } ]}>
                    <View style={styles.firstRow}>
                        <DayComponent day={data.week.days[0]} isToday isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <DayComponent day={data.week.days[1]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)} />
                            <DayComponent day={data.week.days[3]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                            <DayComponent day={data.week.days[5]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                        </View>
                        <View style={styles.col}>
                            <DayComponent day={data.week.days[2]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                            <DayComponent day={data.week.days[4]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                            <DayComponent day={data.week.days[6]} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)}/>
                        </View>
                    </View>
                </Animated.View>
                }
                {this.state.selectedDay &&
                <Animated.View style={[styles.main, styles.singleDay, { opacity: invertedOpacity } ]}>
                    <DayComponent day={this.state.selectedDay} isFetching={data.isFetching} navigation={navigation} options={options} onExpand={(day: Day) => this.onSelectDay(day)} expanded/>
                </Animated.View>
                }
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
    singleDay: {
        backgroundColor: 'gray',
        padding: 5,
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
