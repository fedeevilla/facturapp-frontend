import {
  FETCH_INVOICES,
  DELETE_INVOICE,
  CREATE_INVOICE,
  UPDATE_INVOICE,
  DUPLICATE_INVOICE
} from "../actions/invoices";
import * as R from "ramda";

const initialState = {
  list: [],
  idLoading: null
};

const invoices = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_INVOICES.RESOLVED:
      return {
        ...state,
        list: payload
      };
    case DUPLICATE_INVOICE.STARTED:
      return {
        ...state,
        idLoading: payload._id
      };
    case DUPLICATE_INVOICE.RESOLVED:
    case CREATE_INVOICE.RESOLVED:
      return {
        ...state,
        list: R.append(payload, state.list),
        idLoading: null
      };
    case DELETE_INVOICE.STARTED:
      return {
        ...state,
        idLoading: payload
      };
    case DELETE_INVOICE.RESOLVED:
      return {
        ...state,
        list: R.filter(invoice => invoice._id !== payload, state.list),
        idLoading: null
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
