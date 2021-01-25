const initialState = [];
const ADD_TO_SONG_LIST = "ADD_TO_SONG_LIST";
const REMOVE_FROM_SONG_LIST = "REMOVE_FROM_SONG_LIST";
const songListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_SONG_LIST:
      return [...state, ...payload.newSongs];
    case REMOVE_FROM_SONG_LIST:
      return [...state].filter((song) => song.id !== payload.id);
    default:
      return state;
  }
};
export default songListReducer;
