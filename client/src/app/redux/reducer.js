import { combineReducers } from "redux";
import { theme } from "./reducers/theme";
import { localizeReducer as localize } from "react-localize-redux";

export default combineReducers({
    localize: localize,
    theme: theme  
})