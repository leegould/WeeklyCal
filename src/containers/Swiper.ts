import { connect } from 'react-redux';
import { Moment } from 'moment';
import Swiper from '../components/Swiper';
import { changeWeekDate } from '../actions';

const mapStateToProps = (state: any) => {
    const { week } = state;
    return { data: week };
};

const mapDispatchToProps = (dispatch: any) => ({
    onChangeDate: (date: Moment) => {
      dispatch(changeWeekDate(date));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Swiper);