import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("api/users/fetchAllUsers", async() => {
    const response = await axios.get(`https://asif-online-shop-server.herokuapp.com/api/users`);
    return response.data;
})

export const allUsersSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        
    }
    
})

export const getAllUsers = (state) => state.users.users;
export const getAllUsersStatus = (state) => state.users.status;
export const getAllUsersError = (state) => state.users.error;

export default allUsersSlice.reducer;