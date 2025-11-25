// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
    _id?: string;
    username?: string;
    email?: string;
    avatar?: string;
    fname?: string;
    profilePic?: string;

}

const initialState: UserState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;