import { connect } from 'react-redux';
import Add from '../components/Add';
import { addEvent } from '../actions';
import { CalendarEvent } from '../types';

const mapDispatchToProps = (dispatch: any) => ({
    onAddEvent: (event: CalendarEvent) => {
      dispatch(addEvent(event));
    },
});

export default connect(null, mapDispatchToProps)(Add);