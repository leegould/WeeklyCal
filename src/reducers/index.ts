import { combineReducers } from "redux";
import weekReducer from './week';

const rootReducer = combineReducers({
    week: weekReducer,
});

export default rootReducer;