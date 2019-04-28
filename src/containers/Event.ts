import { connect } from 'react-redux';
import Add from '../components/Event';
import { addEvent, editEvent, deleteEvent } from '../actions';
import { CalendarEvent } from '../types';

const mapDispatchToProps = (dispatch: any) => ({
    onAddEvent: (event: CalendarEvent) => {
      dispatch(addEvent(event));
    },
    onEditEvent: (event: CalendarEvent) => {
      dispatch(editEvent(event));
    },
    onDeleteEvent: (event: CalendarEvent) => {
      dispatch(deleteEvent(event));
    }
});

export default connect(null, mapDispatchToProps)(Add);