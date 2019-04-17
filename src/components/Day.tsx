import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Animated, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements'
import { Day } from '../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'grey',
        borderBottomWidth: 0.5,
        marginBottom: 5,
    },
    header: {
        color: 'gray',
    },
    eventTitle: {
        color: 'gray',
    },
});

type Props = {
    isFetching: boolean,
    day: Day,
    isToday?: boolean,
    navigation: {
        navigate: Function,
    }
};

type State = {
    fade: Animated.Value,
};

export default class DayEvents extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fade: new Animated.Value(1),
        }
    }

    componentDidUpdate() {
        if (this.props.isFetching) {
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
                duration: 750,              
            }
        ).start();
    }

    onAdd() {
        this.props.navigation.navigate('Add', { date: this.props.day.date });
    }

    render() {
        // console.log('Day.render', this.props.day, this.state.events);

        return(
            <Animated.View style={[styles.container, {opacity: this.state.fade}]}>
                <TouchableWithoutFeedback onPress={() => this.onAdd()}>
                    <View style={styles.row}>
                        <Animated.Text style={[styles.header, {opacity: this.state.fade}]}>{`${this.props.day.date.format('ddd')} ${this.props.day.date.format('DD')}`}</Animated.Text>
                        <Icon name='calendar-plus' type='material-community' color='green' onPress={() => this.onAdd()} size={18} />
                    </View>
                </TouchableWithoutFeedback>
                {this.props.day.events && 
                    <FlatList
                        data={this.props.day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            return(
                                <Animated.Text style={[styles.eventTitle, {opacity: this.state.fade}]}>
                                    {item.title}
                                </Animated.Text>
                            );
                        }}
                    />
                }
            </Animated.View>
        );
    }
}

