import { notification } from "antd";
import * as R from "ramda";

export const createApiThunk = ({
  action,
  request,
  resolvedMessage,
  rejectedMessage,
  start = true,
}) => (payload) => async (dispatch, getState) => {
  try {
    start && dispatch(action.start(payload));

    const response = await request(payload, getState(), dispatch);

    if (resolvedMessage) {
      notification.success(
        R.when(R.is(Function), (message) => message(response), resolvedMessage)
      );
    }

    dispatch(action.resolve(response));
  } catch (error) {
    if (rejectedMessage) {
      notification.error(
        R.when(R.is(Function), (message) => message(error), rejectedMessage)
      );
    }

    dispatch(action.reject(error));
  }
};
