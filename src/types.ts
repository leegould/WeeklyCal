import { Moment } from 'moment';

export type ActionType = {
    type: string,
    payload: any,
}

export type CalendarEvent = {
    startDate: Date,
    endDate: Date | undefined,
    allDay: boolean,
    title: string,
    id?: string,
    calendar?: {
        id: string,
        allowsModifications: boolean,
        title: string,
        color: string,
    },
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
    week: {
        days: Day[],
    },
};