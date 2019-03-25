import moment from 'moment';
import {
    EVENTS_FETCH_STARTED,
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_ERROR,
} from '../actions';
import { ActionType } from '../types';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    week: {
        days: [...Array(7).keys()].map(i => {
            return ({
                date: moment().add(i, 'days'),
                events: null,
            });
        }),
    }
};

export default function weekReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        // case CHANGE_WEEK_DATE:
        //     return Object.assign({}, state, {
        //         week: {
        //             days: [...Array(7).keys()].map(i => {
        //                 return ({
        //                     day: moment().add(i, 'days'),
        //                     events: null,
        //                 });
        //             }),
        //         }
        //     });
        case EVENTS_FETCH_STARTED:
            return Object.assign({}, state, {
                isFetching: true,
            }); 
        case EVENTS_FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                week: {...action.payload},
            });
        case EVENTS_FETCH_ERROR:
            console.error(...action.payload);
            return state;
        default:
            return state;
    }
}