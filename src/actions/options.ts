import moment from 'moment';
import {
    RESET_DATE_TOGGLE,
    EVENT_COLOR_TOGGLE,
    DAY_ADD_LINK_TOGGLE,
    ROLLING_WEEK_TOGGLE,
    INLINE_ADD_TOGGLE,
    EVENT_ROW_BORDER_TOGGLE
} from './actiontypes';
import { changeWeekDate } from './index';

export const toggleResetDateOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleResetDate());
    }
}

export const toggleEventColorOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleEventColor());
    }
}

export const toggleEventColorOptionAndUpdateWeek = () => {
    return async (dispatch: Function, getState: () => any) => {
        await dispatch(toggleEventColorOption());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleEventColorOptionAndUpdateWeek.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleDayAddLinkOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleDayAddLink());
    }
}

export const toggleDayAddLinkAndUpdateWeek = () => {
    return async (dispatch: Function, getState: () => any) => {
        await dispatch(toggleDayAddLinkOption());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleDayAddLinkAndUpdateWeek.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleRollingWeekOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleRollingWeek());
    }
}

export const toggleRollingWeekAndUpdateWeek = () => {
    return async (dispatch: Function, getState: () => any) => {
        await dispatch(toggleRollingWeekOption());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleRollingWeekAndUpdateWeek.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleInlineAddOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleInlineAdd());
    }
}

export const toggleInlineAddAndUpdateWeek = () => {
    return async (dispatch: Function, getState: () => any) => {
        await dispatch(toggleInlineAddOption());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleRollingWeekAndUpdateWeek.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleEventRowBorderOption = () => {
    return async (dispatch: Function) => {
        dispatch(toggleEventRowBorder());
    }
}

export const toggleEventRowBorderAndUpdateWeek = () => {
    return async (dispatch: Function, getState: () => any) => {
        await dispatch(toggleEventRowBorderOption());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleRollingWeekAndUpdateWeek.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleResetDate = () => {
    const action = {
        type: RESET_DATE_TOGGLE,
    }
    return action;
}

export const toggleEventColor = () => {
    const action = {
        type: EVENT_COLOR_TOGGLE,
    }
    return action;
}

export const toggleDayAddLink = () => {
    const action = {
        type: DAY_ADD_LINK_TOGGLE,
    }
    return action;
}

export const toggleRollingWeek = () => {
    const action = {
        type: ROLLING_WEEK_TOGGLE,
    }
    return action;
}

export const toggleInlineAdd = () => {
    const action = {
        type: INLINE_ADD_TOGGLE,
    }
    return action;
}

export const toggleEventRowBorder = () => {
    const action = {
        type: EVENT_ROW_BORDER_TOGGLE,
    }
    return action;
}