import { createSlice } from "@reduxjs/toolkit";

const initial = {
    expiry:null,
    token:null,
    user:{},
    is_authenticated: false
}

export const authSlice = createSlice({
    name:'auth',
    initialState:initial,
    reducers:{
        setAuth:(state,action) => {
            state.is_authenticated = true
            state.expiry = action.payload.expiry
            state.token = action.payload.token
            state.user = action.payload.user       
        },
        unsetAuth: state => {
            state.is_authenticated = false
            state = initial
        }
    }
})

export const {setAuth,unsetAuth} = authSlice.actions;
export default authSlice.reducer;
