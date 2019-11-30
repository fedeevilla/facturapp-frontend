import {
  FETCH_PAYMENTS,
  DELETE_PAYMENT,
  CREATE_PAYMENT
} from "../actions/payments";
import * as R from "ramda";

const initialState = {
  list: []
};

const payments = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case FETCH_PAYMENTS.RESOLVED:
      return {
        ...state,
        list: payload
      };
    case CREATE_PAYMENT.RESOLVED:
      return {
        ...state,
        list: R.append(payload, state.list)
      };
    case DELETE_PAYMENT.RESOLVED:
      return {
        ...state,
        list: R.filter(payment => payment._id !== payload, state.list)
      };
    default:
      return state;
  }
};

export default payments;
