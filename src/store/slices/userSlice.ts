import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

const initialState = {
    id: null,
    accessToken: null,
    email: null,
    photoUrl: null,
} as IUser

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.accessToken = action.payload.token
            state.email = action.payload.email
            state.photoUrl = action.payload.photoUrl
        },
        removeUser(state) {
            state.id = null
            state.accessToken = null
            state.email = null
            state.photoUrl = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer