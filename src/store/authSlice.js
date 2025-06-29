import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     status: false,
//     userData: null
// }

// This is for the authentication track to check user is authenticated or not.
const authSlice = createSlice({
    name: "auth",
    // initialState,
    initialState: {
        status: false,
        userData: null
    },
    reducers: {
        login: (state,action) => {
            state.status = true
            state.userData = action.payload.userData
        },

        logout: (state,action) => {
            state.status = false
            state.userData = null
        },
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer