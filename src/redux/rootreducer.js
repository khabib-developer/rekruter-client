import { combineReducers } from "redux";
import { appreducer } from "./appreducer";
import { formreducer } from "./formreducer";
import { ui } from "./ui";

export const rootReducer = combineReducers({
    app: appreducer,form:formreducer,ui
})