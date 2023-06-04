 
 
  import { createSlice } from "@reduxjs/toolkit";

export const  alertSlice = createSlice({
    name:'alert',
    initialState:{
        alerts:[],
        active:false
    },reducers: {
        setAlert:(state,action) => {
            state.alerts.push(action.payload)
            state.active = true
        },
        removeAlert:(state) => {
            state.alerts = []
            state.active = false
        }
    },
})

export const {setAlert,removeAlert} = alertSlice.actions;
export default alertSlice.reducer