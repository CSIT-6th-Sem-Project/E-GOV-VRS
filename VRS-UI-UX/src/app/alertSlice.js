 
 
import { createSlice } from "@reduxjs/toolkit";

//our taost alert format will be this
const alert_format = {text:'',type:''}

export const  alertSlice = createSlice({
    name:'alert',
    initialState:{
        alerts: {}
    },
    reducers: {
        setAlert:(state,action) => {
            // push the alert with id randomly created
            console.log("alert pushed")
            let id = Math.random().toString(36).substring(2,10);
            state.alerts[id] = action.payload
        },

        removeAlert:(state,action) => {
            const next = {...state.alerts}
            delete next[action.payload]
            console.log(`alert ${action.payload} deleted`)
            state.alerts = next
            
        },
        removeAllAlert:(state) => {
            state.alerts = {}
            
        }
    },
})

export const {setAlert,removeAlert,removeAllAlert} = alertSlice.actions;
export default alertSlice.reducer