import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation';
import { WeekState } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: WeekState
};

type State = {
    fade: Animated.Value,
};

export default class Header extends PureComponent<Props, State> {
    static navigationOptions = {
        header: null,
    }

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
        const startDate = this.props.data.week.days[0].date;
        const endDate = this.props.data.week.days[6].date;

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Icon name='settings-applications' type='material' color='lightgray' onPress={() => this.props.navigation.navigate('Options')} size={40} />
                    <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Calendar', { day: startDate }); }}>
                        <View style={styles.headerMiddle}>
                            <Animated.Text style={[styles.headerText, {opacity: this.state.fade}]}>
                                {`${startDate.date()} - ${endDate.date()} ${startDate.format('MMM')} ${startDate.format('YYYY')}`}
                            </Animated.Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Icon name='calendar-range' type='material-community' color='lightgray' onPress={() => this.props.navigation.navigate('Calendar', { day: startDate })} size={40} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#C2272D',
    },
    header: {
        height: 50,
        backgroundColor: '#C2272D',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#C2272D',
        fontSize: 16,
        justifyContent: 'center',
    },
    headerMiddle: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
});