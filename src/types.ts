import { Moment } from 'moment';

export type ActionType = {
    type: string,
    payload: any,
}

export type CalendarEvent = {
    startDate: Date,
    endDate: Date,
    title: string,
};

export type Day = {
    date: Moment,
    events: CalendarEvent[],
}

export type Week = {
    week: {
        days: Day[],
    }
};

export type WeekState = {
    isFetching: boolean,
    didInvalidate: boolean,
    week: {
        days: Day[],
    },
};