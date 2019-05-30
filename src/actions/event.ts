import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { CalendarEvent } from '../types';
import {
    ADD_EVENT_STARTED,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_ERROR,
    EDIT_EVENT_STARTED,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_ERROR,
    DELETE_EVENT_STARTED,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_ERROR,
} from './actiontypes';

export const addEvent = (event: CalendarEvent) => {
    return async (dispatch: Function) => {
        dispatch(addEventStart());

        try {
            // console.log('addEvent.start', event);
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
            // console.log('editEvent.start', event);

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
            // console.log('deleteEvent.start', event);

            const result = await RNCalendarEvents.removeEvent(event.id, undefined);

            dispatch(deleteEventSuccess(result ? event : null));
        } catch (err) {
            dispatch(deleteEventError(err));
        }
    }
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