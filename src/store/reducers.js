import { combineReducers } from "redux";
import { reducer as asyncReducer, REDUCER_NAME } from "async-action-creator";
import invoices from "./reducers/invoices";
import user from "./reducers/user";

const rootReducer = combineReducers({
  user,
  invoices,
  [REDUCER_NAME]: asyncReducer
});

export default rootReducer;
