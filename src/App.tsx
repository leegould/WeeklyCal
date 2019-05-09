
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
// // @ts-ignore
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import Swiper from './containers/Swiper';
import Options from './containers/Options';
import Event from './containers/Event';
// import { WeekState } from './types';

console.disableYellowBox = true;

// const WeekTransform = createTransform(
//     // transform state on its way to being serialized and persisted.
//     (inboundState, key) => {
//       // convert mySet to an Array.
//       return { ...inboundState, mySet: [...inboundState.mySet] };
//     },
//     // transform state being rehydrated
//     (outboundState: WeekState, key) => {
//         // convert mySet back to a Set.
//         const { week } = outboundState;
//         return { ...outboundState, week: {
//             days: [
//                 { } as Day,
//             ]
//         };
//     },
//     // define which reducers this transform gets called for.
//     { whitelist: ['week'] }
// );

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    // transforms: [WeekTransform],
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
