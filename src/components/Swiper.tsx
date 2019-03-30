import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
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

    onMomentumScrollEnd = (e, state, context) => {
        this.props.onChangeDate(this.props.data.week.days[0].date.add(7, 'days'));
        console.log('onMomentumScrollEnd', e, state, context.state);
    }

    render(){
        return (
            <Swiper
                style={styles.wrapper}
                showsButtons={true}
                index={1}
                onMomentumScrollEnd ={this.onMomentumScrollEnd}
            >
            <View style={styles.slide1}>
                <Week navigation={this.props.navigation} data={this.props.data}/>
            </View>
            <View style={styles.slide2}>
                <Week navigation={this.props.navigation} data={this.props.data}/>
            </View>
            <View style={styles.slide3}>
                <Week navigation={this.props.navigation} data={this.props.data}/>
            </View>
            </Swiper>
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