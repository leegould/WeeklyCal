
import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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
    Calendar: {
        screen: mapNavigationStateParamsToProps(Calendar),
        headerMode: 'screen',
    },
},
{
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'orange',
        }
    },
});

// const RootStack = createStackNavigator(
//     {
//         Main: {
//             screen: MainStack,
//         },
//         Calendar: {
//             screen: mapNavigationStateParamsToProps(Calendar),
//         },
//     },
//     {
//       mode: 'modal',
//       headerMode: 'none',
//       navigationOptions: {
//           headerStyle: {
//               backgroundColor: 'purple',
//           },
//       }
//     }
//   );
const AppContainer = createAppContainer(MainStack);

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
