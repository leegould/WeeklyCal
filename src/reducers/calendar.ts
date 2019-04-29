import {
    CALENDAR_FETCH_STARTED,
    CALENDAR_FETCH_SUCCESS,
    CALENDAR_FETCH_ERROR,
} from '../actions';
import { ActionType, AllCalendarsState } from '../types';

const initialState = {
    isFetching: false,
    allCalendars: {
        showAll: true,
        calendars: []
    }
} as AllCalendarsState;

export default function calendarReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case CALENDAR_FETCH_STARTED:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case CALENDAR_FETCH_SUCCESS:
            const calendars = action.payload;
            // console.log('CALENDAR_FETCH_SUCCESS', calendars);
            return Object.assign({}, state, {
                isFetching: false,
                allCalendars: {
                    showAll: state.allCalendars.showAll,
                    calendars,
                },
            }); 
        case CALENDAR_FETCH_ERROR:
            console.error('CALENDAR_FETCH_ERROR', ...action.payload);
            return state;
        default:
            return state;
    }
};
