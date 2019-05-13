import moment, { Moment } from 'moment';
import {
    EVENTS_FETCH_STARTED,
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_ERROR,
    ADD_EVENT_STARTED,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_ERROR,
    EDIT_EVENT_STARTED,
    EDIT_EVENT_ERROR,
    EDIT_EVENT_SUCCESS,
    DELETE_EVENT_STARTED,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_ERROR,
    CALENDAR_SHOW_ALL_TOGGLE,
    CALENDAR_TOGGLE,
} from '../actions';
import { ActionType, WeekState, Calendar, Day, CalendarEvent, Week } from '../types';
import { CalendarEventReadable } from 'react-native-calendar-events';

const initialState = {
    isFetching: false,
    week: {
        days: [...Array(7).keys()].map(i => {
            return ({
                date: moment().add(i, 'days').toDate(),
                events: [],
            });
        }) as Day[],
    },
    calendars: {
        showAll: true,
        selectedCalendars: [],
    }
} as WeekState;

// function addWeekEvents(startDate: Moment, events: CalendarEventReadable[]) : Week {
//     const days = [];
//     for (let i = 0;i < 7;i++) {
//         const dayDate = moment(startDate.clone().add(i, 'days'));
//         const dayEvents = events.filter(x => moment(x.startDate).isSame(dayDate, 'day'));

//         days.push({
//             date: dayDate.toDate(),
//             events: dayEvents,
//         } as Day);
//     }

//     return {
//         days
//     };
// }

function addEventToWeek(week: Week, event: CalendarEvent) {
    const eventStartDate = moment(event.startDate);
    if (eventStartDate.isSameOrAfter(moment(week.days[0].date)) && eventStartDate.isSameOrBefore(moment(week.days[6].date))) {
        const newCalendarEventReadable = {
            id: event.id,
            startDate: moment(event.startDate).toISOString(),
            endDate: moment(event.endDate).toISOString(),
            allDay: event.allDay,
            title: event.title,
            // calendar: { // TODO
            //     id: 
            // }
        } as CalendarEventReadable;

        for (let i = 0;i < 7;i++) {
            const dayDate = moment(week.days[i].date);
            if (dayDate.isSame(eventStartDate, 'day')) {
                if (week.days[i].events !== undefined) {
                    week.days[i].events.push(newCalendarEventReadable);
                    break;
                }
            }
        }
    }
}

export default function weekReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case EVENTS_FETCH_STARTED:
            return Object.assign({}, state, {
                isFetching: true,
            }); 
        case EVENTS_FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                week: {...action.payload},
            });
        case EVENTS_FETCH_ERROR:
            console.error('EVENTS_FETCH_ERROR', ...action.payload);
            return state;
        case ADD_EVENT_STARTED: 
            return Object.assign({}, state, {
                isFetching: true,
            })
        case ADD_EVENT_SUCCESS:
            const newWeek = Object.assign({}, state.week);
            addEventToWeek(newWeek, action.payload);
            console.log('ADD_EVENT_SUCCESS.after', newWeek, state.week);
            return Object.assign({}, state, {
                isFetching: false,
                week: newWeek,
            }); 
        case ADD_EVENT_ERROR:
            console.error('ADD_EVENT_ERROR', ...action.payload);
            return state;
        case EDIT_EVENT_STARTED:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case EDIT_EVENT_SUCCESS:
            const newWeekEdit = Object.assign({}, state.week);
            // console.log('EDIT_EVENT_SUCCESS.Initial', action.payload, newWeekEdit);
            for(let i = 0; i < newWeekEdit.days.length;i++) {
                const dayInWeek = newWeekEdit.days[i];
                if (moment(dayInWeek.date).isSame(action.payload.date, 'day')) {
                    // console.log('EDIT_EVENT_SUCCESS.found', dayInWeek, newWeekEdit.days[i].events, action.payload.events);
                    newWeekEdit.days[i].events = action.payload.events;
                    break;
                }
            }
            // console.log('EDIT_EVENT_SUCCESS', newWeekEdit);
            return Object.assign({}, state, {
                isFetching: false,
                week: newWeekEdit,
            }); 
        case EDIT_EVENT_ERROR:
            console.error('EDIT_EVENT_ERROR', ...action.payload);
            return state;
        case DELETE_EVENT_STARTED:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case DELETE_EVENT_SUCCESS:
            const newWeekDel = Object.assign({}, state.week);
            // console.log('DELETE_EVENT_SUCCESS.Initial', action.payload, newWeekDel);
            for(let i = 0; i < newWeekDel.days.length;i++) {
                const dayInWeek = newWeekDel.days[i];
                if (moment(dayInWeek.date).isSame(action.payload.date, 'day')) {
                    // console.log('DELETE_EVENT_SUCCESS.found', dayInWeek, newWeekDel.days[i].events, action.payload.events);
                    newWeekDel.days[i].events = action.payload.events;
                    break;
                }
            }
            // console.log('DELETE_EVENT_SUCCESS', newWeekDel);
            return Object.assign({}, state, {
                isFetching: false,
                week: newWeekDel,
            }); 
        case DELETE_EVENT_ERROR:
            console.error('DELETE_EVENT_ERROR', ...action.payload);
            return state;
        case CALENDAR_SHOW_ALL_TOGGLE:
            // console.log('CALENDAR_SHOW_ALL_TOGGLE', state);
            const newState = Object.assign({}, state, {
                calendars: {
                    showAll: !state.calendars.showAll,
                    selectedCalendars: state.calendars.selectedCalendars,
                }
            });
            console.log('CALENDAR_SHOW_ALL_TOGGLE', newState);
            return newState;
        case CALENDAR_TOGGLE:
            const acalendar = action.payload as Calendar;
            const selectedCalendars = [...state.calendars.selectedCalendars];
            if (state.calendars.selectedCalendars.indexOf(acalendar.id) > -1) {
                selectedCalendars.splice(selectedCalendars.indexOf(acalendar.id), 1);
            } else {
                selectedCalendars.push(acalendar.id);
            }
            return Object.assign({}, state, {
                calendars: {
                    showAll: state.calendars.showAll,
                    selectedCalendars,
                }
            });
        default:
            return state;
    }
}