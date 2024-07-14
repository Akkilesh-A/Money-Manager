import { createSlice } from "@reduxjs/toolkit";

const initialState=["Family","Friends","Entertainment","Food","Online","Custom","Shopping","Games"]

export const tagsSlice=createSlice({
    name:'tagsSlice',
    initialState:initialState,
    reducers:{
        updateTags : (state,action)=>{
            const tempSet=new Set([...state,action.payload]) 
            return [...tempSet]
        },
        removeTag : (state,action)=>{
            return state.filter((tag)=>{tag!==action.payload})
        },
        getTags :(state,action)=>{
            return state
        }
    }
})

export const {updateTags, removeTag} = tagsSlice.actions
export default tagsSlice.reducer
