import moment, { Moment } from 'moment';
// @ts-ignore
import RNCalendarEvents, { CalendarEventReadable } from 'react-native-calendar-events';
import {
    EVENTS_FETCH_STARTED,
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_ERROR
} from './actiontypes';
import { Day } from '../types';

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
                // console.log('rollingWeek', startDate, endDate);
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
