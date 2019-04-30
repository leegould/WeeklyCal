import {
    CALENDAR_FETCH_STARTED,
    CALENDAR_FETCH_SUCCESS,
    CALENDAR_FETCH_ERROR,
} from '../actions';
import { ActionType, CalendarsState } from '../types';

const initialState = {
    isFetching: false,
    showAll: true,
    allCalendars: [],
    selectedCalendars: [],
} as CalendarsState;

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
                showAll: state.showAll,
                allCalendars: calendars,
            }); 
        case CALENDAR_FETCH_ERROR:
            console.error('CALENDAR_FETCH_ERROR', ...action.payload);
            return state;
        default:
            return state;
    }
};
