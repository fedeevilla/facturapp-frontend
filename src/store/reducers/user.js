import {
  LOGIN_STARTED,
  LOGIN_RESOLVED,
  LOGOUT,
  FETCH_USER,
  UPDATE_USER,
  ACTIVATE_USER,
  LOGIN_REJECTED,
} from "../actions/user";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_STARTED: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case LOGIN_RESOLVED:
    case UPDATE_USER.RESOLVED:
    case ACTIVATE_USER.RESOLVED:
    case FETCH_USER.RESOLVED: {
      return {
        ...state,
        ...payload,
        error: null,
      };
    }
    case LOGIN_REJECTED:
      return {
        ...state,
        user: null,
        loading: false,
        error: payload,
      };
    case LOGOUT.RESOLVED:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
