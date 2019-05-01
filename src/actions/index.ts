import moment, { Moment } from 'moment';
// @ts-ignore
import RNCalendarEvents from 'react-native-calendar-events';
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
export const CALENDAR_SELECT = 'CALENDAR_SELECT';
export const CALENDAR_DESELECT = 'CALENDAR_DESELECT';

// https://alligator.io/redux/redux-thunk/
export const changeWeekDate = (date: Moment) => {
    return async (dispatch: Function) => {
        dispatch(eventsFetchStarted());

        try {
            const days = [];
            for (let i = 0;i < 7;i++) {
                const aDate = moment(date.clone().add(i, 'days').format('YYYY-MM-DD'));
                const startDate = aDate.startOf().format('YYYY-MM-DDTHH:mm:ss.sssZ');
                const endDate = aDate.endOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');
                const events = await RNCalendarEvents.fetchAllEvents(
                    startDate,
                    endDate,    
                );
                // console.log('aDate', aDate, events, startDate, endDate);
                days.push({
                    date: aDate,
                    events,
                } as Day);
            };

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
            const eventEndDate = event.allDay ? event.startDate : event.endDate;
            const startDate = moment(event.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');
            const endDate = moment(eventEndDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');

            await RNCalendarEvents.saveEvent(event.title, {
                startDate: event.startDate,
                endDate: eventEndDate,
                allDay: event.allDay,
            });

            const dayEvents = await RNCalendarEvents.fetchAllEvents(
                startDate,
                endDate,
            );

            // The above does not seem to include the new event we just added.. so get that by id and add it!
            // const newEvent = await RNCalendarEvents.findEventById(newEventId);

            // dayEvents.push(newEvent);

            const day = {
                date: moment(event.startDate),
                events: dayEvents,
            } as Day;

            dispatch(addEventSuccess(day));
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

            const eventEndDate = event.allDay ? event.startDate : event.endDate;
            const startDate = moment(event.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');
            const endDate = moment(eventEndDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');

            await RNCalendarEvents.saveEvent(event.title, {
                id: event.id,
                startDate: event.startDate,
                endDate: eventEndDate,
                allDay: event.allDay,
            });

            const dayEvents = await RNCalendarEvents.fetchAllEvents(
                startDate,
                endDate,
            );

            const day = {
                date: moment(event.startDate),
                events: dayEvents,
            } as Day;

            dispatch(editEventSuccess(day));
        } catch (err) {
            dispatch(editEventError(err));
        }
    }
}

export const deleteEvent = (event: CalendarEvent) => {
    return async (dispatch: Function) => {
        dispatch(deleteEventStart());

        try {
            console.log('deleteEvent.start', event);

            const eventEndDate = event.allDay ? event.startDate : event.endDate;
            const startDate = moment(event.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');
            const endDate = moment(eventEndDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss.sssZ');

            await RNCalendarEvents.removeEvent(event.id, {});

            const dayEvents = await RNCalendarEvents.fetchAllEvents(
                startDate,
                endDate,
            );

            const day = {
                date: moment(event.startDate),
                events: dayEvents,
            } as Day;

            dispatch(editEventSuccess(day));
        } catch (err) {
            dispatch(editEventError(err));
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

export const selectCalendar = (calendar: Calendar) => {
    return async (dispatch: Function) => {
        dispatch(calendarSelect(calendar));
    }
}

export const deselectCalendar = (calendar: Calendar) => {
    return async (dispatch: Function) => {
        dispatch(calendarDeselect(calendar));
    }
}

export const eventsFetchStarted = () => {
    const action = {
        type: EVENTS_FETCH_STARTED,
    }
    return action;
}

export const eventsFetchSuccess = (week: any) => {
    console.log('eventsFetchSuccess', week);
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
    console.log('addEventSuccess', event);
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
    console.log('editEventSuccess', event);
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
    console.log('deleteEventSuccess', event);
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
    console.log('calendarFetchSuccess', allCalendars);
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

export const calendarSelect = (calendar: Calendar) => {
    const action = {
        type: CALENDAR_SELECT,
        payload: calendar,
    }
    return action;
}

export const calendarDeselect = (calendar: Calendar) => {
    const action = {
        type: CALENDAR_DESELECT,
        payload: calendar,
    }
    return action;
}
