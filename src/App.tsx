
import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RNCalendarEvents from 'react-native-calendar-events';
import thunk from 'redux-thunk';
import allReducers from './reducers';
// import Week from './containers/Week';
import Swiper from './containers/Swiper';
import Options from './components/Options';
import Add from './containers/Add';
import Calendar from './containers/Calendar';

type Props = {
    navigation: {
        state: {
            params: any
        }
    },
};

const store = createStore(allReducers, applyMiddleware(thunk));

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
    Home: Swiper,
    Options: Options,
    Add: Add,
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
    async componentDidMount() {
        try {
            await RNCalendarEvents.authorizeEventStore();
        }
        catch (err) {
            console.log('componentDidMount.error', err);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
