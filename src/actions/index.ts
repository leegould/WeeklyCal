import moment, { Moment } from 'moment';
// @ts-ignore
import RNCalendarEvents, { CalendarEventReadable } from 'react-native-calendar-events';
import { Day, CalendarEvent, Calendar } from '../types';

export const EVENTS_FETCH_STARTED = 'EVENTS_FETCH_STARTED';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR';
export const ADD_EVENT_STARTED = 'ADD_EVENT_STARTED';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR';
export const EDIT_EVENT_STARTED = 'EDIT_EVENT_STARTED';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_ERROR = 'EDIT_EVENT_ERROR';
export const DELETE_EVENT_STARTED = 'DELETE_EVENT_STARTED';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';
export const CALENDAR_FETCH_STARTED = 'CALENDAR_FETCH_STARTED';
export const CALENDAR_FETCH_SUCCESS = 'CALENDAR_FETCH_SUCCESS';
export const CALENDAR_FETCH_ERROR ='CALENDAR_FETCH_ERROR';
export const CALENDAR_TOGGLE = 'CALENDAR_TOGGLE';
export const CALENDAR_SHOW_ALL_TOGGLE = 'CALENDAR_SHOW_ALL_TOGGLE';
export const RESET_DATE_TOGGLE = 'RESET_DATE_TOGGLE';
export const EVENT_COLOR_TOGGLE = 'EVENT_COLOR_TOGGLE';
export const DAY_ADD_LINK_TOGGLE = 'DAY_ADD_LINK_TOGGLE';
export const ROLLING_WEEK_TOGGLE = 'ROLLING_WEEK_TOGGLE';

// https://alligator.io/redux/redux-thunk/
export const changeWeekDate = (date: Moment, showAll: boolean, selectedCalendars: string[], rollingWeek: boolean) => {
    return async (dispatch: Function) => {
        dispatch(eventsFetchStarted());

        try {
            let startDate = moment(date.clone().startOf().format('YYYY-MM-DD'));
            let endDate = moment(date.clone().add(6, 'days').format('YYYY-MM-DD')).endOf('day');

            if (!rollingWeek) {
                startDate = moment(startDate).startOf('isoWeek');
                endDate = moment(startDate).endOf('isoWeek');
                console.log('rollingWeek', startDate, endDate);
            }
            
            const calendarIds = showAll ? undefined : selectedCalendars;

            const events = await RNCalendarEvents.fetchAllEvents(
                startDate.toISOString(),
                endDate.toISOString(),
                calendarIds,
            );

            // console.log('changeWeekDate.fetchEvents', status, startDate, endDate, showAll, selectedCalendars, events);

            const days = [];
            for (let i = 0;i < 7;i++) {
                const dayDate = moment(startDate.clone().add(i, 'days'));
                const dayEvents = events.filter(x => moment(x.startDate).isSame(dayDate, 'day'));

                days.push({
                    date: dayDate.toDate(),
                    events: dayEvents,
                } as Day);
            }

            const week = {
                days
            };

            dispatch(eventsFetchSuccess(week));
        } catch (err) {
            dispatch(eventsFetchError(err));
        }
    }
}

export const addEvent = (event: CalendarEvent) => {
    return async (dispatch: Function) => {
        dispatch(addEventStart());

        try {
            console.log('addEvent.start', event);
            const eventEndDate = !event.allDay && event.endDate ? event.endDate : event.startDate;
            const startDate = moment(event.startDate);
            const endDate = moment(eventEndDate);

            const result = await RNCalendarEvents.saveEvent(event.title, {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                allDay: event.allDay,
            });

            const newEvent = await RNCalendarEvents.findEventById(result);

            dispatch(addEventSuccess(newEvent));
        } catch (err) {
            dispatch(addEventError(err));
        }
    }
}

export const editEvent = (event: CalendarEvent) => {
    return async (dispatch: Function) => {
        dispatch(editEventStart());

        try {
            console.log('editEvent.start', event);

            const eventEndDate = !event.allDay && event.endDate ? event.endDate : event.startDate;
            const startDate = moment(event.startDate);
            const endDate = moment(eventEndDate);

            const result = await RNCalendarEvents.saveEvent(event.title, {
                id: event.id,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                allDay: event.allDay,
            });

            const editEvent = await RNCalendarEvents.findEventById(result);

            dispatch(editEventSuccess(editEvent));
        } catch (err) {
            dispatch(editEventError(err));
        }
    }
}

export const deleteEvent = (event: CalendarEvent) => {
    return async (dispatch: Function) => {
        dispatch(deleteEventStart());

        if (!event.id) {
            dispatch(deleteEventError(new Error('Event has no id!')));
            return;
        }

        try {
            console.log('deleteEvent.start', event);

            const result = await RNCalendarEvents.removeEvent(event.id, undefined);

            dispatch(deleteEventSuccess(result ? event : null));
        } catch (err) {
            dispatch(deleteEventError(err));
        }
    }
}

export const fetchCalendars = () => {
    return async (dispatch: Function) => {
        dispatch(calendarFetchStart());

        try {
            console.log('fetchCalendars.start');

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
        console.log('toggleShowAllAndUpdateCalendar.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

export const toggleCalendarAndUpdateWeek = (calendar: Calendar) => {
    return async (dispatch: any, getState: () => any) => {
        await dispatch(toggleCalendar(calendar));
        const { calendars: { showAll, selectedCalendars, rollingWeek }, week: { week: { days } } } = getState();
        console.log('toggleShowAllAndUpdateCalendar.getState', days[0].date, showAll, selectedCalendars);
        await dispatch(changeWeekDate(moment(days[0].date), showAll, selectedCalendars, rollingWeek));
    }
}

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

export const eventsFetchStarted = () => {
    const action = {
        type: EVENTS_FETCH_STARTED,
    }
    return action;
}

export const eventsFetchSuccess = (week: any) => {
    // console.log('eventsFetchSuccess', week);
    const action = {
        type: EVENTS_FETCH_SUCCESS,
        payload: week,
    }
    return action;
}

export const eventsFetchError = (error: Error) => {
    const action = {
        type: EVENTS_FETCH_ERROR,
        payload: {
            error
        }
    }
    return action;
}

export const addEventStart = () => {
    const action = {
        type: ADD_EVENT_STARTED,
    }
    return action;
}

export const addEventSuccess = (event: any) => {
    // console.log('addEventSuccess', event);
    const action = {
        type: ADD_EVENT_SUCCESS,
        payload: event,
    }
    return action;
}

export const addEventError = (error: Error) => {
    const action = {
        type: ADD_EVENT_ERROR,
        payload: {
            error
        }
    }
    return action;
}

export const editEventStart = () => {
    const action = {
        type: EDIT_EVENT_STARTED,
    }
    return action;
}

export const editEventSuccess = (event: any) => {
    // console.log('editEventSuccess', event);
    const action = {
        type: EDIT_EVENT_SUCCESS,
        payload: event,
    }
    return action;
}

export const editEventError = (error: Error) => {
    const action = {
        type: EDIT_EVENT_ERROR,
        payload: {
            error
        }
    }
    return action;
}

export const deleteEventStart = () => {
    const action = {
        type: DELETE_EVENT_STARTED,
    }
    return action;
}

export const deleteEventSuccess = (event: any) => {
    // console.log('deleteEventSuccess', event);
    const action = {
        type: DELETE_EVENT_SUCCESS,
        payload: event,
    }
    return action;
}

export const deleteEventError = (error: Error) => {
    const action = {
        type: DELETE_EVENT_ERROR,
        payload: {
            error
        }
    }
    return action;
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
