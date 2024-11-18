import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userapi } from "./userapi";
import userReducer from "./userSlice"
const rootReducer = combineReducers({
    user:userReducer,
    [userapi.reducerPath]: userapi.reducer
    
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userapi.middleware)
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
