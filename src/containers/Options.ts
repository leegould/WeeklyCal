import { connect } from 'react-redux';
import Options from '../components/Options';
import { fetchCalendars, toggleCalendar, toggleShowAllCalendars } from '../actions';
import { Calendar } from '../types';

const mapStateToProps = (state: any) => {
    return { data: state.calendars };
};

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCalendars: () => {
        dispatch(fetchCalendars());
    },
    onToggleShowAll: () => {
        dispatch(toggleShowAllCalendars());
    },
    onToggleCalendar: (calendar: Calendar) => {
        dispatch(toggleCalendar(calendar));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);