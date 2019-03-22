import moment, { Moment } from 'moment';
import { actionType } from '../actions';

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
        default:
            return state;
    }
}