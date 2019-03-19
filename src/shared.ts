import { Moment } from 'moment';

export type CalendarDay = {
    date: Moment,
    events: CalendarEvent[]
}

export type CalendarEvent = {
    startDate: Date,
    title: string,
};
