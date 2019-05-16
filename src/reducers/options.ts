import {
    RESET_DATE_TOGGLE,
    // CALENDAR_FETCH_SUCCESS,
    // CALENDAR_FETCH_ERROR,
    // CALENDAR_SHOW_ALL_TOGGLE,
    // CALENDAR_TOGGLE,
} from '../actions';
import { ActionType, CalendarsState, OptionsState } from '../types';

const initialState = {
    isFetching: false,
    showAll: true,
    allCalendars: [],
    selectedCalendars: [],
    resetDate: true,
} as CalendarsState & OptionsState;

export default function optionsReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case RESET_DATE_TOGGLE:
            return Object.assign({}, state, {
                resetDate: !state.resetDate,
            });
        default:
            return state;
    }
}