
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
// @ts-ignore
import { PersistGate } from 'redux-persist/lib/integration/react';
// @ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import Swiper from './containers/Swiper';
import Options from './containers/Options';
import Event from './containers/Event';

console.disableYellowBox = true;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, allReducers);
const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

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
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        );
    }
}
