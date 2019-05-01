import { connect } from 'react-redux';
import Options from '../components/Options';
import { fetchCalendars } from '../actions';
import { selectCalendar, deselectCalendar } from '../actions/index';
import { Calendar } from '../types';

const mapStateToProps = (state: any) => {
    return { data: state.calendars };
};

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCalendars: () => {
        dispatch(fetchCalendars());
    },
    onSelectCalendar: (calendar: Calendar) => {
        dispatch(selectCalendar(calendar));
    },
    onDeselectCalendar: (calendar: Calendar) => {
        dispatch(deselectCalendar(calendar));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);