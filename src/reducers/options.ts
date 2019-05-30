import {
    RESET_DATE_TOGGLE,
    EVENT_COLOR_TOGGLE,
    DAY_ADD_LINK_TOGGLE,
    ROLLING_WEEK_TOGGLE,
    INLINE_ADD_TOGGLE,
    EVENT_ROW_BORDER_TOGGLE,
} from '../actions';
import { ActionType, CalendarsState, OptionsState } from '../types';

const initialState = {
    isFetching: false,
    showAll: true,
    allCalendars: [],
    selectedCalendars: [],
    resetDate: true,
    eventColor: true,
    dayAddLink: true,
    rollingWeek: true,
    inlineAdd: true,
    eventRowBorder: true,
} as CalendarsState & OptionsState;

export default function optionsReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case RESET_DATE_TOGGLE:
            return Object.assign({}, state, {
                resetDate: !state.resetDate,
            });
        case EVENT_COLOR_TOGGLE:
            return Object.assign({}, state, {
                eventColor: !state.eventColor,
            });
        case DAY_ADD_LINK_TOGGLE:
            return Object.assign({}, state, {
                dayAddLink: !state.dayAddLink,
            });
        case ROLLING_WEEK_TOGGLE:
            return Object.assign({}, state, {
                rollingWeek: !state.rollingWeek,
            });
        case INLINE_ADD_TOGGLE:
            return Object.assign({}, state, {
                inlineAdd: !state.inlineAdd,
            });
        case EVENT_ROW_BORDER_TOGGLE:
            return Object.assign({}, state, {
                eventRowBorder: !state.eventRowBorder,
            });
        default:
            return state;
    }
}