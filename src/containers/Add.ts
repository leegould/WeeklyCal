import { connect } from 'react-redux';
import { Moment } from 'moment';
import Add from '../components/Add';
import { addEvent, getEventsForDay } from '../actions';
import { CalendarEvent } from '../types';

const mapDispatchToProps = (dispatch: any) => ({
    onAddEvent: (event: CalendarEvent) => {
      dispatch(addEvent(event));
    },
    onGetEventsForDay: (date: Moment) => {
        dispatch(getEventsForDay(date));
    }
});

export default connect(null, mapDispatchToProps)(Add);