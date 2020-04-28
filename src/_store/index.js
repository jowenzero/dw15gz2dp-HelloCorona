import { createStore, combineReducers, applyMiddleware  } from "redux";
import user from "../_reducers/user";
import article from "../_reducers/article";
import consultation from "../_reducers/consultation";
import { logger, promise } from "../middleware";

const middleware = [logger, promise];

const rootReducer = combineReducers({
    user,
    article,
    consultation,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;