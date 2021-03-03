const initialState = { merge: false };
const dashboardReducer = (state = initialState, action) => {
  const { type } = action;
  return type === "TOGGLE_MERGE" ? { merge: !state.merge } : state;
};
export default dashboardReducer;
