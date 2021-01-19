const initialState = [];
const UPDATE_SONG_LIST = "UPDATE_SONG_LIST";
const songListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === UPDATE_SONG_LIST) {
    return payload.newSongList;
  } else {
    return state;
  }
};
export default songListReducer;
