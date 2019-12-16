import {
  FETCH_INVOICES,
  DELETE_INVOICE,
  CREATE_INVOICE,
  UPDATE_INVOICE
} from "../actions/invoices";
import * as R from "ramda";

const initialState = {
  list: []
};

const invoices = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_INVOICES.RESOLVED:
      return {
        ...state,
        list: payload
      };
    case CREATE_INVOICE.RESOLVED:
      return {
        ...state,
        list: R.append(payload, state.list)
      };
    case DELETE_INVOICE.RESOLVED:
      return {
        ...state,
        list: R.filter(invoice => invoice._id !== payload, state.list)
      };
    case UPDATE_INVOICE.RESOLVED:
      return {
        ...state,
        list: R.map(
          invoice => (invoice._id === payload._id ? payload : invoice),
          state.list
        )
      };
    default:
      return state;
  }
};

export default invoices;
