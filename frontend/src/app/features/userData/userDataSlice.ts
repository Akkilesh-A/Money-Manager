import { createSlice } from "@reduxjs/toolkit";

// const initialState={
//     name:"",
//     email:"",
//     imgURL:"",
//     tags:[]
// }

export const userDataSlice = createSlice({
    name:"userData",
    initialState:{
        value:0
    },
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            state.value-=1
        }
    }
})

export const  {
    increment,
    decrement
} = userDataSlice.actions

export default userDataSlice.reducer