import { connect } from 'react-redux';
import { Moment } from 'moment';
import Options from '../components/Options';
import {
    fetchCalendars,
    changeWeekDate,
    toggleShowAllAndUpdateWeek,
    toggleCalendarAndUpdateWeek,
    toggleResetDateOption,
    toggleEventColorOptionAndUpdateWeek,
    toggleDayAddLinkAndUpdateWeek,
    toggleRollingWeekAndUpdateWeek,
    toggleInlineAddAndUpdateWeek,
    toggleEventRowBorderAndUpdateWeek
} from '../actions';
import { Calendar } from '../types';

const mapStateToProps = (state: any) => {
    return { 
        data: state.calendars,
        options: state.options,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCalendars: () => {
        dispatch(fetchCalendars());
    },
    onChangeDate: (date: Moment, showAll: boolean, selectedCalendars: string[], rollingWeek: boolean) => {
        dispatch(changeWeekDate(date, showAll, selectedCalendars, rollingWeek));
    },
    onToggleShowAllAndUpdateWeek: () => {
        dispatch(toggleShowAllAndUpdateWeek());
    },
    onToggleCalendarAndUpdateWeek: (calendar: Calendar) => {
        dispatch(toggleCalendarAndUpdateWeek(calendar));
    },
    onToggleResetDateOption: () => {
        dispatch(toggleResetDateOption());
    },
    onToggleEventColorOptionAndUpdateWeek: () => {
        dispatch(toggleEventColorOptionAndUpdateWeek());
    },
    onToggleDayAddLinkAndUpdateWeek: () => {
        dispatch(toggleDayAddLinkAndUpdateWeek());
    },
    onToggleRollingWeekAndUpdateWeek: () => {
        dispatch(toggleRollingWeekAndUpdateWeek());
    },
    onToggleInlineAddAndUpdateWeek: () => {
        dispatch(toggleInlineAddAndUpdateWeek());
    },
    onToggleEventRowBorderAndUpdateWeek: () => {
        dispatch(toggleEventRowBorderAndUpdateWeek());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);