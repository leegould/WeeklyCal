import { combineReducers } from "redux";
import calendarReducer from './calendar';
import optionsReducer from './options';
import weekReducer from './week';

const rootReducer = combineReducers({
    calendars: calendarReducer, 
    options: optionsReducer,
    week: weekReducer,
});

export default rootReducer;