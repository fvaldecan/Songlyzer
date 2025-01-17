import { combineReducers } from "redux";
import songListReducer from "./songListReducer";
import songIdToDashboardReducer from "./songIdToDashboardReducer";
import modalReducer from "./modalReducer";
import currentSongReducer from "./currentSongReducer";
import tokenReducer from "./tokenReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
  songList: songListReducer,
  songIdToDashboard: songIdToDashboardReducer,
  modal: modalReducer,
  currentSong: currentSongReducer,
  token: tokenReducer,
  dashboardState: dashboardReducer,
});
export default rootReducer;
