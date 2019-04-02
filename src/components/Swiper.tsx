import React, { PureComponent } from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';
import Week from './Week';
import { WeekState } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState,
    onChangeDate: Function,
};

type State = {
    index: number,
    zone: string,
    updating: boolean,
};

export default class NavigationSwiper extends PureComponent<Props, State> {
    static navigationOptions = {
        header: null,
    }

    static getDirectionAndColor = ({ moveX, moveY, dx, dy}) => {
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
      
        if (dragDirection) return dragDirection;
    }

    panResponder: any;
    position: Animated.ValueXY;

    constructor(props: Props) {
        super(props);
        this.state = {
            index: 1,
            zone: '',
            updating: false,
        }
        this.position = new Animated.ValueXY({ x: 0, y: 0 });
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => { return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1 },//true,
            onPanResponderMove: async (evt, gestureState) => {
                const drag = NavigationSwiper.getDirectionAndColor(gestureState);
                if (drag) {
                    console.log(`drag '${drag}'`);
                    if(!this.state.updating) {
                        if (drag === 'right') {
                            console.log('drag.right', drag);
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(-7, 'days'));
                        }
                        if (drag === 'left') {
                            console.log('drag.left', drag);
                            this.props.onChangeDate(this.props.data.week.days[0].date.add(7, 'days'));
                        }
                        await this.setState({ updating: false });
                    } else {
                        console.log('drag.updating', drag);
                        await this.setState({ zone: drag, updating: true });
                    }
                }
            },
        });
    }

    render(){
        return (
            <Animated.View style={styles.slide2} {...this.panResponder.panHandlers}>
                <Week navigation={this.props.navigation} data={this.props.data}/>
            </Animated.View>
        );
    }
}

  const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      backgroundColor: 'blue',
    },
    slide2: {
      flex: 1,
      backgroundColor: 'green',
    },
    slide3: {
      flex: 1,
      backgroundColor: 'red',
    },
});