import { combineReducers } from "redux";
import { reducer as asyncReducer, REDUCER_NAME } from "async-action-creator";
import payments from "./reducers/payments";
import user from "./reducers/user";

const rootReducer = combineReducers({
  user,
  payments,
  [REDUCER_NAME]: asyncReducer
});

export default rootReducer;
