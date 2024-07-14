import {configureStore} from "@reduxjs/toolkit"
import tagsReducer from "../features/tagsSlice"

export const store = configureStore({
    reducer:{
        tags: tagsReducer
    }
})

