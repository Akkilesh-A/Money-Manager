import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    email:"",
    imgURL:"",
    tags:[],
    token:"",
    
}

export const userDataSlice = createSlice({
    name:"userData",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setTags:(state,action)=>{
            state.tags=action.payload
        },
        appendTag:(state,action)=>{
            state.tags+=action.payload
        },
        setUserData:(state,action)=>{
            state.email=action.payload.email
            state.name=action.payload.name
            state.imgURL=action.payload.imgURL
            state.tags=action.payload.tags
        }
    }
})

export const  {
    setToken,
    setTags,
    appendTag,
    setUserData
} = userDataSlice.actions

export default userDataSlice.reducer