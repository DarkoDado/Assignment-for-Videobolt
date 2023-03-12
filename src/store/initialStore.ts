import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameSlice from './initialState'

const rootReducer = combineReducers({
    game: gameSlice
})

const store = configureStore({
    reducer: rootReducer,

})

export default store











