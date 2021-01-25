const initialState = {
  data: {},
  widgets: [],
};
const CHANGE_CURRENT_SONG = "CHANGE_CURRENT_SONG";
const AUTO_FILL = "AUTO_FILL";
const CLEAR = "CLEAR";
const currentSongReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_CURRENT_SONG:
      return payload.dashboardData;
    case AUTO_FILL:
      return payload.dashboardData;
    case CLEAR:
      return { data: state.data, widgets: [] };
    default:
      return state;
  }
};
export default currentSongReducer;
