import {
    CALENDAR_FETCH_STARTED,
    CALENDAR_FETCH_SUCCESS,
    CALENDAR_FETCH_ERROR,
    CALENDAR_SHOW_ALL_TOGGLE,
    CALENDAR_TOGGLE,
} from '../actions';
import { ActionType, CalendarsState, Calendar } from '../types';

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
        case CALENDAR_SHOW_ALL_TOGGLE:
            return Object.assign({}, state, {
                showAll: !state.showAll,
            });
        case CALENDAR_TOGGLE:
            const acalendar = action.payload as Calendar;
            const selectedCalendars = [...state.selectedCalendars];
            console.log('CALENDAR_TOGGLE', selectedCalendars);
            if (selectedCalendars.indexOf(acalendar.id) > -1) {
                selectedCalendars.splice(selectedCalendars.indexOf(acalendar.id), 1);
            } else {
                selectedCalendars.push(acalendar.id);
            }
            return Object.assign({}, state, {
                selectedCalendars,
            });
        default:
            return state;
    }
};
