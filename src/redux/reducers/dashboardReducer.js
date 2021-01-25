const initialState = { merge: false };
const dashboardReducer = (state = initialState, action) => {
  //TODO ADDING NEW SONG WHILE AT MERGE STATE
  // ADD TO CHARTS?
  const { type } = action;
  return type === "TOGGLE_MERGE" ? { merge: !state.merge } : state;
};
export default dashboardReducer;
