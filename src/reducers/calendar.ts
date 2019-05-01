import {
    CALENDAR_FETCH_STARTED,
    CALENDAR_FETCH_SUCCESS,
    CALENDAR_FETCH_ERROR,
    CALENDAR_SELECT,
    CALENDAR_DESELECT,
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
        case CALENDAR_SELECT:
            return Object.assign({}, state, {
                selectedCalendars: state.selectedCalendars.push(action.payload),
            });
        case CALENDAR_DESELECT:
            const calendar = action.payload as Calendar;
            return Object.assign({}, state, {
                selectedCalendars: state.selectedCalendars.filter(x => x.id !== calendar.id),
            });
        default:
            return state;
    }
};
