import { connect } from 'react-redux';
import Options from '../components/Options';
import { fetchCalendars } from '../actions';

const mapStateToProps = (state: any) => {
    return { data: state.calendars };
};

const mapDispatchToProps = (dispatch: any) => ({
    onFetchCalendars: () => {
        dispatch(fetchCalendars());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);