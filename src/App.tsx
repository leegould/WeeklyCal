
import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Week from './Week';
import Options from './Options';
import Calendar from './Calendar';

type Props = {
    navigation: {
        state: {
            params: any
        }
    },
};

const mapNavigationStateParamsToProps = (SomeComponent: any) => {
    return class extends PureComponent<Props> {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation, ...otherProps} = this.props
            const {state: {params}} = navigation
            return <SomeComponent {...this.props} {...params} />
        }
    }
}

const MainStack = createStackNavigator({
    Home: Week,
    Options: Options,
},
{
    initialRouteName: "Home",
    headerMode: 'screen',
});

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        Calendar: {
            screen: mapNavigationStateParamsToProps(Calendar),
        },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );

const AppContainer = createAppContainer(RootStack);

export default class App extends React.PureComponent {
    render() {
      return <AppContainer />;
    }
}
