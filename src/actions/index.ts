import { Moment } from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { Week, Day } from '../types';

export const CHANGE_WEEK_DATE = 'CHANGE_WEEK_DATE';
export const EVENTS_FETCH_STARTED = 'EVENTS_FETCH_STARTED';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR';

// https://alligator.io/redux/redux-thunk/
export const changeWeekDate = (date: Moment) => {
    return async (dispatch: Function) => {
        dispatch(eventsFetchStarted());

        try {
            const week = {
                days: await Promise.all([...Array(7).keys()].map(async i => {
                    const adate = date.add(i, 'days');
                    return ({
                        date: adate,
                        events: await RNCalendarEvents.fetchAllEvents(
                            adate.clone().startOf(),
                            adate.clone().endOf()
                        ),
                    } as Day);
                })),
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