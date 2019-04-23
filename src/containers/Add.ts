import { connect } from 'react-redux';
import Add from '../components/Add';
import { addEvent } from '../actions';
import { SimpleCalendarEvent } from '../types';

const mapDispatchToProps = (dispatch: any) => ({
    onAddEvent: (event: SimpleCalendarEvent) => {
      dispatch(addEvent(event));
    },
});

export default connect(null, mapDispatchToProps)(Add);