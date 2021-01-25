const initalState = {};
const ADD_TO_MAP = "ADD_TO_MAP";
const REMOVE_FROM_MAP = "REMOVE_FROM_MAP";
const songIdToDashboardReducer = (state = initalState, action) => {
  const { type, payload } = action;
  const newState = state;
  switch (type) {
    case ADD_TO_MAP:
      newState[payload.id] = payload.dashboardData;
      return newState;
    case REMOVE_FROM_MAP:
      delete newState[payload.id];
      return newState;
    default:
      return state;
  }
};
export default songIdToDashboardReducer;
