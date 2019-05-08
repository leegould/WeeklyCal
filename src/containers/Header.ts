import { connect } from 'react-redux';
import { Moment } from 'moment';
import Header from '../components/Header';
import { changeWeekDate } from '../actions';

const mapStateToProps = (state: any) => {
    const { week } = state;
    return { data: week };
};

const mapDispatchToProps = (dispatch: any) => ({
    onChangeDate: (date: Moment, showAll: boolean, selectedCalendars: string[]) => {
        dispatch(changeWeekDate(date, showAll, selectedCalendars));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);