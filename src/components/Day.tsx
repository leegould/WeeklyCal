import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Animated, TouchableWithoutFeedback} from 'react-native';
import { Day } from '../types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'grey',
        borderBottomWidth: 1,
    }
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
                duration: 500,              
            }
        ).start();
    }

    render() {
        // console.log('Day.render', this.props.day, this.state.events);

        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Add', { date: this.props.day.date });
                    }}>
                    <View style={styles.row}>
                        <Text>{this.props.day.date.format('dddd')}</Text>
                        <Animated.Text style={{opacity: this.state.fade}}>{this.props.day.date.format('DD')}</Animated.Text>
                    </View>
                </TouchableWithoutFeedback>
                {this.props.day.events && 
                    <FlatList
                        data={this.props.day.events}
                        keyExtractor={(item, index) => `event_key_${index}`}
                        renderItem={({item}) => {
                            // console.log('item', item);
                            return(
                                <Animated.Text style={{opacity: this.state.fade}}>
                                    {item.title}
                                </Animated.Text>
                            );
                        }}
                    />
                }
            </View>
        );
    }
}

