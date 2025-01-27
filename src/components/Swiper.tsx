import React, { PureComponent } from 'react';
import { StyleSheet, Animated, PanResponder, StatusBar, Dimensions } from 'react-native';
// @ts-ignore
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import Week from './Week';
import { WeekState, OptionsState } from '../types';
import Header from '../containers/Header';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    options: OptionsState,
    onChangeDate: Function,
    onAddEvent: Function,
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
        const halfWindowWidth = Math.floor(Dimensions.get('window').width / 2);
        const draggedDown = dy > halfWindowWidth;
        const draggedUp = dy < -halfWindowWidth;
        const draggedLeft = dx < -halfWindowWidth;
        const draggedRight = dx > halfWindowWidth;
        let dragDirection = '';
      
        if (draggedDown || draggedUp) {
            if (draggedDown) dragDirection += 'down'
            if (draggedUp) dragDirection +=  'up';
        }
      
        if (draggedLeft || draggedRight) {
            if (draggedLeft) dragDirection += 'left'
            if (draggedRight) dragDirection +=  'right';
        }
        // console.log('getDirectionAndColor', dx, dy, halfWindowWidth, dragDirection, draggedDown, draggedUp, draggedLeft, draggedRight);
      
        return dragDirection;
    }

    panResponder: any;
    position: Animated.ValueXY;

    constructor(props: Props) {
        super(props);
        
        this.position = new Animated.ValueXY({ x: 0, y: 0 });
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => { return !this.props.data.isFetching },
            onMoveShouldSetPanResponder: (evt, gestureState) => { return Math.abs(gestureState.dx) >= Math.abs(gestureState.dy * 3) }, // If the horizontal is bigger than the vertical, use this responder
            onPanResponderRelease: async (evt, gestureState) => {
                const drag = NavigationSwiper.getDirectionAndColor(gestureState);
                if (drag) {
                    if(!this.props.data.isFetching) {
                        if (drag === 'right') {
                            this.props.onChangeDate(moment(this.props.data.week.days[0].date).add(-7, 'days'),  this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars);
                        }
                        if (drag === 'left') {
                            this.props.onChangeDate(moment(this.props.data.week.days[0].date).add(7, 'days'), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars);
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
            // console.log('status', status);
            if (status !== 'authorized') {
                await RNCalendarEvents.authorizeEventStore();
                this.props.onChangeDate(moment(), this.props.data.calendars.showAll, this.props.data.calendars.selectedCalendars); // Load initial week.
            }
        }
        catch (err) {
            // console.log('componentDidMount.error', err);
        }
    }

    render(){
        // console.log('data', this.props.data);
        return (
            <Animated.View style={styles.slide} {...this.panResponder.panHandlers}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#6a51ae"
                />
                <Week navigation={this.props.navigation} data={this.props.data} options={this.props.options} onAddEvent={this.props.onAddEvent}/>
            </Animated.View>
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
        paddingBottom: 10,
    },
});