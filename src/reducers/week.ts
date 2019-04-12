import moment from 'moment';
import {
    EVENTS_FETCH_STARTED,
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_ERROR,
    ADD_EVENT_STARTED,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_ERROR,
} from '../actions';
import { ActionType } from '../types';

const initialState = {
    isFetching: false,
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
            console.error('EVENTS_FETCH_ERROR', ...action.payload);
            return state;
        case ADD_EVENT_STARTED: 
            return Object.assign({}, state, {
                isFetching: true,
            })
        case ADD_EVENT_SUCCESS:
            const newWeek = Object.assign({}, state.week);
            console.log('ADD_EVENT_SUCCESS.Initial', action.payload, newWeek);
            for(let i = 0; i < newWeek.days.length;i++) {
                const dayInWeek = newWeek.days[i];
                if (dayInWeek.date.isSame(action.payload.date, 'day')) {
                    console.log('ADD_EVENT_SUCCESS.found', dayInWeek, newWeek.days[i].events, action.payload.events);
                    newWeek.days[i].events = action.payload.events;
                    break;
                }
            }
            console.log('ADD_EVENT_SUCCESS', newWeek);
            return Object.assign({}, state, {
                isFetching: false,
                week: newWeek,
            }); 
        case ADD_EVENT_ERROR:
            console.error('ADD_EVENT_ERROR', ...action.payload);
            return state;
        default:
            return state;
    }
}