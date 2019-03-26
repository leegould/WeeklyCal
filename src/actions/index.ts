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
                let aDate = moment(date.clone().add(i, 'days').format('YYYY-MM-DD'));
                console.log('aDate', i, date.clone().add(i, 'days').format('DD-MM-YYYY'), aDate);
                days.push({
                    date: aDate,
                    events: await RNCalendarEvents.fetchAllEvents(
                        aDate.startOf(),
                        aDate.endOf()
                    ),
                } as Day);
            };

            // const events = await RNCalendarEvents.fetchAllEvents(
            //     days[0].date.clone().startOf(),
            //     days[6].date.clone().endOf()
            // );

            // for (let i = 0;i < events.length;i++) {
            //     const event = events[i];
            //     console.log('event', event);
            //     const eventDate = moment(event.startDate).date();
            //     for(let j = 0; j < days.length;j++) {
            //         if (eventDate === days[j].date.date()) {
            //             days[j].events.push(event);
            //             break;
            //         }
            //     }
            // }

            const week = {
                days
            };

            console.log('week', week);

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