import { connect } from 'react-redux';
import { Moment } from 'moment';
import Options from '../components/Options';
import { fetchCalendars, changeWeekDate, toggleShowAllAndUpdateWeek, toggleCalendarAndUpdateWeek, toggleResetDateOption } from '../actions';
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
    onChangeDate: (date: Moment, showAll: boolean, selectedCalendars: string[]) => {
        dispatch(changeWeekDate(date, showAll, selectedCalendars));
    },
    onToggleShowAllAndUpdateWeek: () => {
        dispatch(toggleShowAllAndUpdateWeek());
    },
    onToggleCalendarAndUpdateWeek: (calendar: Calendar) => {
        dispatch(toggleCalendarAndUpdateWeek(calendar));
    },
    onToggleResetDateOption: () => {
        dispatch(toggleResetDateOption());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);