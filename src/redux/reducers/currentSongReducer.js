const initialState = {
  data: {},
  widgets: [],
};
const CHANGE_CURRENT_SONG = "CHANGE_CURRENT_SONG";
const currentSongReducer = (state = initialState, action) => {
  const { type, payload } = action;
  return type === CHANGE_CURRENT_SONG ? payload.newCurrentSong : state;
};
export default currentSongReducer;
