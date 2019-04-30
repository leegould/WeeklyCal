import React from 'react';
import { View, FlatList, Switch, StyleSheet, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CalendarsState, Calendar } from '../types';

type Props = {
    navigation: {
        navigate: Function,
    }
    data: CalendarsState,
    onFetchCalendars: Function,
};

type State = {
    showAll: boolean,
    anim: Animated.Value,
};

export default class Options extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: 'Options',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            showAll: true,
            anim: new Animated.Value(this.props.data.showAll ? 0 : 1),
        };

        try {
            props.onFetchCalendars();
        }
        catch (err) {
            console.log('Options.componentDidMount.error', err);
        }
    }

    toggleAllDay = () => this.setState((previousState: State) => {
        if (!previousState.showAll) {
            this.hide();
        } else {
            this.show();
        }
        return {
            showAll: !previousState.showAll,
        }
    });

    show() {
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1250,
        }).start()
    }

    hide() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 1250,
        }).start()
    }


    render() {
        console.log('Options.render.data', this.props.data);

        return (
            <View style={{ flex: 1,  backgroundColor: 'gray' }}>
                {!this.props.data.isFetching &&
                <View style={{ flex: 1, marginVertical: 20 }}>
                    <ListItem
                        key={'showAll'}
                        title={'Show All Calendars'}
                        rightAvatar={
                            <Switch
                                onValueChange={this.toggleAllDay}
                                value={this.state.showAll}
                                trackColor={{true: '#C2272D', false: ''}}
                                style={styles.switchInput}
                            />
                        }
                    />
                    {!this.state.showAll &&
                    <Animated.FlatList
                        style={{ opacity: this.state.anim }}
                        // containerStyle={{opacity: this.state.anim }}
                        data={this.props.data.allCalendars}
                        renderItem={({item}: {item: Calendar}) =>
                            <ListItem
                                key={item.id}
                                title={item.title}
                                subtitle={item.source}
                                rightAvatar={
                                    <Switch
                                        // onValueChange={this.toggleAllDay}
                                        // this.props.data.selectedCalendars.findIndex(x => x.id === item.id) > -1
                                        value={false}
                                        trackColor={{true: '#C2272D', false: ''}}
                                        style={styles.switchInput}
                                    />
                                }
                            >
                            </ListItem>
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
