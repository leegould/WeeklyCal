import moment, { Moment } from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { Day } from '../types';

export const CHANGE_WEEK_DATE = 'CHANGE_WEEK_DATE';
export const EVENTS_FETCH_STARTED = 'EVENTS_FETCH_STARTED';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR';

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