import { combineReducers } from "redux";
import calendarReducer from './calendar';
import weekReducer from './week';

const rootReducer = combineReducers({
    calendars: calendarReducer, 
    week: weekReducer,
});

export default rootReducer;