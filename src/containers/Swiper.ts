import { connect } from 'react-redux';
import { Moment } from 'moment';
import Swiper from '../components/Swiper';
import { changeWeekDate } from '../actions';

const mapStateToProps = (state: any) => {
    const { week, options } = state;
    return {
        data: week,
        options
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    onChangeDate: (date: Moment, showAll: boolean, selectedCalendars: string[], rollingWeek: boolean) => {
        dispatch(changeWeekDate(date, showAll, selectedCalendars, rollingWeek));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Swiper);