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
    ROLLING_WEEK_TOGGLE,
} from '../actions';
import { ActionType, WeekState, Calendar, Day } from '../types';
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
        rollingWeek: true,
    }
} as WeekState;

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
            const event = action.payload as CalendarEventReadable;
            const eventStartDate = moment(event.startDate);

            if (eventStartDate.isSameOrAfter(moment(newWeek.days[0].date)) && eventStartDate.isSameOrBefore(moment(newWeek.days[6].date))) {
                for (let i = 0;i < newWeek.days.length;i++) {
                    const dayDate = moment(newWeek.days[i].date);
                    if (dayDate.isSame(eventStartDate, 'day')) {
                        const clone = newWeek.days[i].events.slice(0);
                        clone.push(event);
                        newWeek.days[i].events = clone;
                        break;
                    }
                }
            }

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
            const eventEdit = action.payload as CalendarEventReadable;
            const eventEditStartDate = moment(eventEdit.startDate);

            if (eventEditStartDate.isSameOrAfter(moment(newWeekEdit.days[0].date)) && eventEditStartDate.isSameOrBefore(moment(newWeekEdit.days[6].date))) {
                for(let i = 0; i < newWeekEdit.days.length;i++) {
                    const dayDateEdit = moment(newWeekEdit.days[i].date);
                    if (dayDateEdit.isSame(eventEditStartDate, 'day')) {
                        const cloneEdit = newWeekEdit.days[i].events.slice(0);
                        const editEventIndex = cloneEdit.findIndex(x => x.id === eventEdit.id);
                        if (editEventIndex !== -1) {
                            cloneEdit[editEventIndex] = eventEdit;
                        }
                        newWeekEdit.days[i].events = cloneEdit;
                        break;
                    }
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
            if (action.payload !== null) {
                const eventDelete = action.payload as CalendarEventReadable;
                const eventDeleteStartDate = moment(eventDelete.startDate);

                if (eventDeleteStartDate.isSameOrAfter(moment(newWeekDel.days[0].date)) && eventDeleteStartDate.isSameOrBefore(moment(newWeekDel.days[6].date))) {
                    for(let i = 0; i < newWeekDel.days.length;i++) {
                        const dayDateEdit = moment(newWeekDel.days[i].date);
                        if (dayDateEdit.isSame(eventDeleteStartDate, 'day')) {
                            const cloneDel = newWeekDel.days[i].events.slice(0);
                            const delEventIndex = cloneDel.findIndex(x => x.id === eventDelete.id);
                            if (delEventIndex !== -1) {
                                cloneDel.splice(delEventIndex, 1);
                            }
                            newWeekDel.days[i].events = cloneDel;
                            break;
                        }
                    }
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
        case ROLLING_WEEK_TOGGLE:
            return Object.assign({}, state, {
                calendars: {
                    rollingWeek: !state.calendars.rollingWeek,
                }
            });
        default:
            return state;
    }
}