import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { NotificationReducer } from "./reducer/NotificationReducer";
import { UserReducer } from "./reducer/UserReducer";

const rootReducer = combineReducers({
    UserReducer: UserReducer,
    NotificationReducer: NotificationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
