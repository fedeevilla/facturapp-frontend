export const isLoading = (action, state) => action.getStatus(state) === "pending";
