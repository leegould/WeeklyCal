import moment, { Moment } from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { actionType, CHANGE_WEEK_DATE } from '../actions';

export type calendarEvent = {
    startDate: Date,
    title: string,
};

export type dayState = {
    date: Moment,
    events: calendarEvent[]
}

export type weekState = {
    week: {
        days: dayState[],
    }
};

function getWeek(date: Moment) {
    try {
        console.log('loading for date', date);
        (async () => {
            const days = await Promise.all([...Array(7).keys()].map(async i => {
                return ({
                    date: date.add(i, 'days'),
                    events: await RNCalendarEvents.fetchAllEvents(
                        date.clone().startOf(),
                        date.clone().endOf()
                    ),
                });
            }));
            console.log('days', days);
            return ({ days });
        })(); 
    } catch (err) {
        console.error(err);
    }
}

const initialState = {
    days: [...Array(7).keys()].map(i => {
        return ({
            date: moment().add(i, 'days'),
            events: null,
        });
    })
};

export default function weekReducer(state = initialState, action: actionType) {
    switch (action.type) {
        case CHANGE_WEEK_DATE:
            return Object.assign({}, state, getWeek(moment(action.payload)));
        default:
            return state;
    }
}