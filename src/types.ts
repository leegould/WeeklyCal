import { Moment } from 'moment';
import { CalendarEventReadable } from 'react-native-calendar-events';

export type ActionType = {
    type: string,
    payload: any,
};

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
    date: Date,
    events: CalendarEventReadable[],
};

export type Week = {
    days: Day[],
};

export type WeekState = {
    isFetching: boolean,
    week: {
        days: Day[],
    },
    calendars: {
        showAll: boolean,
        selectedCalendars: string[],
    }
};

export type Calendar = {
    id: string,
    title: string,
    source: string,
    color: string,
    show: boolean,
};

export type CalendarsState = {
    isFetching: boolean,
    showAll: boolean,
    allCalendars: Calendar[],
    selectedCalendars: string[],
};

export type OptionsState = {
    resetDate: boolean,
    eventColor: boolean,
    dayAddLink: boolean,
}
