import React, { PureComponent } from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';
// import Swiper from 'react-native-swiper';
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
};

// const { width, height } = Dimensions.get("window");

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
          if (draggedDown) dragDirection += 'down '
          if (draggedUp) dragDirection +=  'up';
        }
      
        if (draggedLeft || draggedRight) {
          if (draggedLeft) dragDirection += 'left '
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
        }
        this.position = new Animated.ValueXY({ x: 0, y: 0 });
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => { return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1 },//true,
            onPanResponderMove: (evt, gestureState) => {
                // console.log("I was moved")
                // this.position.setValue({ x: gestureState.moveX, y: gestureState.moveY })
                const drag = NavigationSwiper.getDirectionAndColor(gestureState);
                // console.log('drag', drag);
                if (drag) {
                    console.log('drag', drag);
                    this.setState({ zone: drag });
                }
            },
        });
    }

    // onIndexChanged = async (i:number) => {
    //     const loopedUp = i === 0 && this.state.index === 2;
    //     const loopedDown = i === 2 && this.state.index === 0;
    //     const isIncreased = loopedUp || (!loopedDown && i > this.state.index);
    //     // const isIncreased = (i > this.state.index && i !== 2) || (i === 0 && this.state.index === 2);
    //     // const isIncreased = (this.state.index === 2 && i === 0) || (this.state.index !== 0 && i !== 2) || i > this.state.index;
    //     let days = 7;
    //     if (!isIncreased) {
    //         days = -7;
    //     }
    //     console.log('onIndexChanged', i, this.state.index, days);
    //     console.log(`up:${loopedUp}, down:${loopedDown} isIncreased:${isIncreased}`)
    //     this.props.onChangeDate(this.props.data.week.days[0].date.add(days, 'days'));
    //     await this.setState({index: i});
    // }

    // onMomentumScrollEnd = (e, state, context) => {
    //     // this.props.onChangeDate(this.props.data.week.days[0].date.add(7, 'days'));
    //     console.log('onMomentumScrollEnd', e, state, context.state);
    // }

    render(){
        return (
            // <Swiper
            //     style={styles.wrapper}
            //     index={1}
            //     onIndexChanged={this.onIndexChanged}
            //     showsButtons={false}
            //     // showsPagination={false}
            // >
            // <View style={styles.slide1}>
            //     <Week navigation={this.props.navigation} data={this.props.data}/>
            // </View>
            <Animated.View style={styles.slide2} {...this.panResponder.panHandlers}>
                <Week navigation={this.props.navigation} data={this.props.data}/>
            </Animated.View>
            // <View style={styles.slide3}>
            //     <Week navigation={this.props.navigation} data={this.props.data}/>
            // </View>
            // </Swiper>
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