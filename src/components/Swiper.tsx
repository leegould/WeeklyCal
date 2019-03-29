import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Week from './Week';
import { WeekState } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState
};

export default class NavigationSwiper extends PureComponent<Props> {
    static navigationOptions = {
        header: null,
    }

    render(){
        return (
            <Swiper style={styles.wrapper} showsButtons={true}>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
});