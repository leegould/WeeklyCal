import React from 'react';
import { View, Switch, StyleSheet, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import { CalendarsState, Calendar } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: CalendarsState,
    onFetchCalendars: Function,
    onChangeDate: Function,
    onToggleShowAll: Function,
    onToggleCalendar: Function,
};

type State = {
    anim: Animated.Value,
};

export default class Options extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Options',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            anim: new Animated.Value(this.props.data.showAll ? 0 : 1),
        };

        try {
            props.onFetchCalendars();
        }
        catch (err) {
            console.log('Options.componentDidMount.error', err);
        }
    }

    toggleAllDay() {
        if (this.props && this.props.data.showAll) {
            this.show();
        } else {
            this.hide();
        }
        this.props.onToggleShowAll();
        this.props.onChangeDate(moment(), this.props.data.showAll, this.props.data.selectedCalendars);
    }

    toggleCalendar(item: Calendar) {
        this.props.onToggleCalendar(item);
        // TODO : how to get selected date? pass in?
        this.props.onChangeDate(moment(), this.props.data.showAll, this.props.data.selectedCalendars);
    }

    show() {
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 250,
        }).start()
    }

    hide() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 250,
        }).start()
    }


    render() {
        // console.log('Options.render.data', this.props.data);

        return (
            <View style={{ flex: 1,  backgroundColor: 'gray' }}>
                {!this.props.data.isFetching &&
                <View style={{ flex: 1, marginVertical: 5 }}>
                    <ListItem
                        key={'showAll'}
                        title={'Show All Calendars'}
                        rightAvatar={
                            <Switch
                                onValueChange={() => this.toggleAllDay()}
                                value={this.props.data.showAll}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        titleStyle={{ color: 'white' }}
                        subtitleStyle={{ color: 'white' }}
                    />
                    {!this.props.data.showAll &&
                    <Animated.FlatList
                        style={{ opacity: this.state.anim }}
                        data={this.props.data.allCalendars}
                        scrollEnabled={false}
                        renderItem={({item}: {item: Calendar}) => {
                                return(
                                    <ListItem
                                        key={item.id}
                                        title={item.title}
                                        subtitle={item.source}
                                        rightAvatar={
                                            <Switch
                                                onValueChange={() => this.toggleCalendar(item)}
                                                // this.props.data.selectedCalendars.findIndex(x => x.id === item.id) > -1
                                                value={this.props.data.selectedCalendars.indexOf(item.id) > -1}
                                                // trackColor={{true: '#C2272D', false: ''}}
                                                trackColor={{true: item.color, false: item.color}}
                                                style={styles.switchInput}
                                            />
                                        }
                                        containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
                                        titleStyle={{ color: 'white' }}
                                        subtitleStyle={{ color: 'white' }}
                                    />
                                );
                            }
                        }
                        keyExtractor={(item: Calendar, index: number) => item.id}
                    />
                    }
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    switchInput: {
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
    },
});
