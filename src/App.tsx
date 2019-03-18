
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Week from './Week';
import Options from './Options';

const AppNavigator = createStackNavigator({
    Home: Week,
    Options: Options,
},
{
    initialRouteName: "Home",
    headerMode: 'screen',
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
    render() {
      return <AppContainer />;
    }
}
