import moment, { Moment } from 'moment';
import { actionType, CHANGE_WEEK_DATE } from '../actions';

export type weekState = {
    week: {
        days: Moment[],
    }
};

const initialState = {
    days: [...Array(7).keys()].map(i => moment().add(i, 'days')),
};

export default function weekReducer(state = initialState, action: actionType) {
    switch (action.type) {
        case CHANGE_WEEK_DATE:
            return Object.assign({}, state, {
               days: [...Array(7).keys()].map(i => moment(action.payload).add(i, 'days')),
            });
        default:
            return state;
    }
}