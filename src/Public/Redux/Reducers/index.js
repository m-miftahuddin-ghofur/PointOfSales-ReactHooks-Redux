import { combineReducers } from "redux";

import product from './Products'

const appReducer = combineReducers({
    product,
})

export default appReducer;