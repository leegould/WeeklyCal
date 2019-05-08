
import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import Swiper from './containers/Swiper';
import Options from './containers/Options';
import Event from './containers/Event';
import Calendar from './containers/Calendar';

console.disableYellowBox = true;

type Props = {
    navigation: {
        state: {
            params: any
        }
    },
};

const store = createStore(allReducers, applyMiddleware(thunk));

// const mapNavigationStateParamsToProps = (SomeComponent: any) => {
//     return class extends PureComponent<Props> {
//         static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
//         render() {
//             const {navigation} = this.props
//             const {state: {params}} = navigation
//             return <SomeComponent {...this.props} {...params} />
//         }
//     }
// }

const MainStack = createStackNavigator({
    Home: Swiper,
    Options: Options,
},
{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C2272D',
        },
        headerTitleStyle: {
            color:'lightgray',
        },
        headerBackTitleStyle: {
            color:'lightgray',
        },
        headerTintColor: 'lightgray',
    },
});

const MainNavigator = createStackNavigator({
    Home: MainStack,
    Event: Event,
},
{
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    cardStyle: { opacity: 1 },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
