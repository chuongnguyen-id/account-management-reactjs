import { combineReducers } from "redux";

import account from "./accountReducers";
import userLoginInfo from "./userLoginInfoReducer";

export default combineReducers({
  userLoginInfo,
  account,
});
