import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderItems = createAsyncThunk(
  "/api/users/:userName/orderItems/:order_id/fetchOrderItems",
  async (arr1) => {
    const userName = arr1[0];
    const order_id = arr1[1];
    const response = await axios.get(
      `https://asif-online-shop-server.herokuapp.com/api/users/${userName}/orderItems/${order_id}`
    );
    return response.data;
  }
);
export const fetchAllOrderItems = createAsyncThunk(
  "/api/orderItems/fetchAllOrderItems",
  async () => {
    const response = await axios.get(
      `https://asif-online-shop-server.herokuapp.com/api/orderItems`
    );
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orderItems",
  initialState: {
    orderItemStatus: "idle",
    orderItems: [],
    packagingItems: [],
    shippingItems: [],
    completedItems: [],
    canceledItems: [],
    orderError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderItems.pending, (state) => {
      state.orderItemStatus = "loading";
    });
    builder.addCase(fetchAllOrderItems.fulfilled, (state, action) => {
     //state.orderItems = action.payload;
     state.packagingItems = action.payload.filter(item => item.orderStatus==="Packaging");
      state.shippingItems = action.payload.filter(item => item.orderStatus==="Shipping");
      state.completedItems = action.payload.filter(item => item.orderStatus==="Completed");
      state.canceledItems = action.payload.filter(item => item.orderStatus==="Canceled");
      state.orderItemStatus = "all succeeded";
    });
    builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
     // state.orderItems = action.payload;
      state.packagingItems = action.payload.filter(item => item.orderStatus==="Packaging");
      state.shippingItems = action.payload.filter(item => item.orderStatus==="Shipping");
      state.completedItems = action.payload.filter(item => item.orderStatus==="Completed");
      state.canceledItems = action.payload.filter(item => item.orderStatus==="Canceled");
      state.orderItemStatus = "succeeded";
    });
    builder.addCase(fetchOrderItems.rejected, (state, action) => {
      state.orderItemStatus = "failed";
      state.orderError = action.error.message;
    });
  },
});

export default orderSlice.reducer;
