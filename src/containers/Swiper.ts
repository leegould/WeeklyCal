import { connect } from 'react-redux';
import { Moment } from 'moment';
import Swiper from '../components/Swiper';
import { changeWeekDate, addEvent } from '../actions';
import { CalendarEvent } from '../types';

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
    onAddEvent: (event: CalendarEvent) => {
        dispatch(addEvent(event));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Swiper);