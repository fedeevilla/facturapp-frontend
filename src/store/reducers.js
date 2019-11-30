import { combineReducers } from "redux";
import { reducer as asyncReducer, REDUCER_NAME } from "async-action-creator";
import payments from "./reducers/payments";

const rootReducer = combineReducers({
  payments,
  [REDUCER_NAME]: asyncReducer
});

export default rootReducer;
