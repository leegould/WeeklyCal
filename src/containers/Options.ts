import { connect } from 'react-redux';
import { Moment } from 'moment';
import Options from '../components/Options';
import { fetchCalendars, toggleCalendar, toggleShowAllCalendars, changeWeekDate } from '../actions';
import { Calendar } from '../types';

const mapStateToProps = (state: any) => {
    return { data: state.calendars };
};

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCalendars: () => {
        dispatch(fetchCalendars());
    },
    onChangeDate: (date: Moment, showAll: boolean, selectedCalendars: string[]) => {
        dispatch(changeWeekDate(date, showAll, selectedCalendars));
    },
    onToggleShowAll: () => {
        dispatch(toggleShowAllCalendars());
    },
    onToggleCalendar: (calendar: Calendar) => {
        dispatch(toggleCalendar(calendar));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);