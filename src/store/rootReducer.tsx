import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import headsender from "./headsender/reducer";

export default combineReducers({
  user,
  appState,
  headsender,
});
