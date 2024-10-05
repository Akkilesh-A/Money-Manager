import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/userData/userDataSlice";

export const store=configureStore({
    reducer:{
        userData:userDataReducer
    }
})