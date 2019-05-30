import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { Calendar } from '../types';
import {
    CALENDAR_TOGGLE,
    CALENDAR_FETCH_STARTED,
    CALENDAR_FETCH_SUCCESS,
    CALENDAR_FETCH_ERROR,
    CALENDAR_SHOW_ALL_TOGGLE,
} from './actiontypes';
import { changeWeekDate } from '.';

export const fetchCalendars = () => {
    return async (dispatch: Function) => {
        dispatch(calendarFetchStart());

        try {
            // console.log('fetchCalendars.start');

            const calendars = await RNCalendarEvents.findCalendars();

            dispatch(calendarFetchSuccess(calendars));
        } catch (err) {
            dispatch(calendarFetchError(err));
        }
    }
}

export const toggleShowAllCalendars = () => {
    return async (dispatch: any) => {
        await dispatch(toggleShowAllCalendarsAction());
    }
}

export const toggleCalendar = (calendar: Calendar) => {
    return async (dispatch: Function) => {
        dispatch(toggleCalendarAction(calendar));
    }
}

export const toggleShowAllAndUpdateWeek = () => {
    return async (dispatch: any, getState: () => any) => {
        await dispatch(toggleShowAllCalendars());
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleShowAllAndUpdateCalendar.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleCalendarAndUpdateWeek = (calendar: Calendar) => {
    return async (dispatch: any, getState: () => any) => {
        await dispatch(toggleCalendar(calendar));
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        // console.log('toggleShowAllAndUpdateCalendar.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}
export const calendarFetchStart = () => {
    const action = {
        type: CALENDAR_FETCH_STARTED,
    }
    return action;
}

export const calendarFetchSuccess = (allCalendars: any) => {
    // console.log('calendarFetchSuccess', allCalendars);
    const action = {
        type: CALENDAR_FETCH_SUCCESS,
        payload: allCalendars,
    }
    return action;
}

export const calendarFetchError = (error: Error) => {
    const action = {
        type: CALENDAR_FETCH_ERROR,
        payload: {
            error
        }
    }
    return action;
}

export const toggleShowAllCalendarsAction = () => {
    const action = {
        type: CALENDAR_SHOW_ALL_TOGGLE,
    }
    return action;
}

export const toggleCalendarAction = (calendar: Calendar) => {
    const action = {
        type: CALENDAR_TOGGLE,
        payload: calendar,
    }
    return action;
}
