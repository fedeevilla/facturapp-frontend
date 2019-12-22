import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  UPDATE_USER,
  ACTIVATE_USER
} from "../actions/user";

const initialState = {
  token: localStorage.getItem("token")
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN.RESOLVED:
    case UPDATE_USER.RESOLVED:
    case ACTIVATE_USER.RESOLVED:
    case FETCH_USER.RESOLVED: {
      return {
        ...state,
        ...payload
      };
    }
    case LOGOUT.RESOLVED:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

export default user;
