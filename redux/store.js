import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { UserReducer } from "./reducer/UserReducer";

const rootReducer = combineReducers({
    UserReducer: UserReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));