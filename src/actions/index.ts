import { Moment } from 'moment';

export const CHANGE_WEEK_DATE = 'CHANGE_WEEK_DATE';

export type actionType = {
    type: string,
    payload: any,
}

export const changeWeekDate = (date: Moment) => {
    const action: actionType = {
        type: CHANGE_WEEK_DATE,
        payload: date,
    };
    return action;
}