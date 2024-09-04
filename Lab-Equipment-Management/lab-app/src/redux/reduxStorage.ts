import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/AuthenticationSlices";
import ComponentReducer from './slices/ComponentSlice';
import modalReducer from './slices/modalSlice'
export const store=configureStore({
    reducer:{
       authentication: authenticationReducer,
       modal:modalReducer,
       component:ComponentReducer
    }
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;