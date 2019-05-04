import React, { PureComponent } from 'react';
import { StyleSheet, Animated, PanResponder, StatusBar } from 'react-native';
// @ts-ignore
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import Week from './Week';
import { WeekState } from '../types';
import Header from '../containers/Header';
import { SafeAreaView } from 'react-navigation';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    onChangeDate: Function,
};

export default class NavigationSwiper extends PureComponent<Props> {
    static navigationOptions = ({ navigation }: { navigation: any }) => {
        return {
            headerStyle: {
                backgroundColor: 'green',
            },
            header: <Header navigation={navigation} />,
        }
    }

    static getDirectionAndColor = ({ dx, dy }: { dx: number, dy: number }) => {
        const draggedDown = dy > 100;
        const draggedUp = dy < -100;
        const draggedLeft = dx < -100;
        const draggedRight = dx > 100;
        let dragDirection = '';
      
        if (draggedDown || draggedUp) {
            if (draggedDown) dragDirection += 'down'
            if (draggedUp) dragDirection +=  'up';
        }
      
        if (draggedLeft || draggedRight) {
            if (draggedLeft) dragDirection += 'left'
            if (draggedRight) dragDirection +=  'right';
        }
      
        return dragDirection;
    }

    panResponder: any;
    position: Animated.ValueXY;

    constructor(props: Props) {
        super(props);
        
        this.position = new Animated.ValueXY({ x: 0, y: 0 });
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => { return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1 },//true,
            onPanResponderMove: async (evt, gestureState) => {
                const drag = NavigationSwiper.getDirectionAndColor(gestureState);
                if (drag) {
                    if(!this.props.data.isFetching) {
                        if (drag === 'right') {
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(-7, 'days'),  this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars);
                        }
                        if (drag === 'left') {
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(7, 'days'), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars);
                        }
                    }
                }
            },
        });

        this.props.onChangeDate(moment(), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars); // Load initial week.
    }

    async componentDidMount() {
        try {
            const status = await RNCalendarEvents.authorizationStatus();
            console.log('status', status);
            if (status !== 'authorized') {
                const askForStatus = await RNCalendarEvents.authorizeEventStore();
                console.log('askForStatus', askForStatus);
                this.props.onChangeDate(moment(), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars); // Load initial week.
            }
        }
        catch (err) {
            console.log('componentDidMount.error', err);
        }
    }

    render(){
        console.log('data', this.props.data);
        return (
            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={styles.slide} {...this.panResponder.panHandlers}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#6a51ae"
                    />
                    <Week navigation={this.props.navigation} data={this.props.data}/>
                </Animated.View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'gray',
    },
    slide: {
        flex: 1,
        backgroundColor: 'gray',
    },
});