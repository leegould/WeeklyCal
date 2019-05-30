import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

type Props = {
    // key: string,
    title: string,
    subtitle: string,
    value: boolean,
    onValueChange: Function,
    trackColor?: string,
}

export default class Option extends React.PureComponent<Props> {
    render() {
        const trackColor = this.props.trackColor ? this.props.trackColor : '#C2272D';

        return(
            <ListItem
                key={this.props.title.replace(' ', '')}
                title={this.props.title}
                subtitle={this.props.subtitle}
                rightAvatar={
                    <Switch
                        onValueChange={() => this.props.onValueChange()}
                        value={this.props.value}
                        trackColor={{true: trackColor, false: trackColor}}
                        style={styles.switchInput}
                    />
                }
                containerStyle={{ backgroundColor: 'lightgray', borderBottomWidth: 1, borderBottomColor: 'gray' }}
                titleStyle={{ color: 'white' }}
                subtitleStyle={{ color: 'white', fontSize: 10, marginVertical: 5 }}
            />
        );
    }
}

const styles = StyleSheet.create({
    switchInput: {
        transform: [{ scaleX: .8 }, { scaleY: .8 }]
    },
});