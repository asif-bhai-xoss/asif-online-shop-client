import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "api/users/fetchUser",
  async (userName) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userName}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: {},
    error: null,
  },
  reducers: {
    signOut: (state, action) => {
      state.status = "idle";
      action.payload = {};
      state.user = {};
  },
},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});



export const { signOut, cartCalculation } = userSlice.actions;
export default userSlice.reducer;
