import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import logger from "redux-logger";

import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(promiseMiddleware, logger));

export default store;
