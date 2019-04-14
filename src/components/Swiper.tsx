import React, { PureComponent } from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';
// import { SafeAreaView } from "react-navigation";
import moment from 'moment';
import Week from './Week';
import { WeekState } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    onChangeDate: Function,
};

export default class NavigationSwiper extends PureComponent<Props> {
    static navigationOptions = {
        header: null,
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
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(-7, 'days'));
                        }
                        if (drag === 'left') {
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(7, 'days'));
                        }
                    }
                }
            },
        });

        this.props.onChangeDate(moment()); // Load initial week.
    }

    render(){
        console.log('data', this.props.data);
        return (
            // <SafeAreaView style={styles.safeArea} forceInset={{
            //     top: 'never',
            //     bottom: 'never',
            //   }}>
                <Animated.View style={styles.slide} {...this.panResponder.panHandlers}>
                    <Week navigation={this.props.navigation} data={this.props.data}/>
                </Animated.View>
            // </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'green',
    },
    slide: {
        flex: 1,
        backgroundColor: 'white',
    },
});