import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
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
};

type State = {
    fade: Animated.Value,
};

export default class DayEvents extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fade: new Animated.Value(0),
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
        
        // TODO : move this to getderivedstate/componentwillrecieveprops
        if (this.props.isFetching) {
            this.fadeOut();
        } else {
            this.fadeIn();
        }

        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{this.props.day.date.format('dddd')}</Text>
                    <Animated.Text style={{opacity: this.state.fade}}>{this.props.day.date.format('DD')}</Animated.Text>
                </View>
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

