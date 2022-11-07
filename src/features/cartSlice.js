import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "/api/users/:userName/cartItems/fetchCartItems",
  async (userName) => {
    const response = await axios.get(
      `https://asif-online-shop-server.herokuapp.com/api/users/${userName}/cartItems`
    );
    //console.log(response.data);
    return response.data;
  }
);

//delete all item from cartItem
export const deleteCartItems = createAsyncThunk(
  "/api/:userName/cartItems/:cid/fetchCartItems",
  async (arr1) => {
    const userName = arr1[0];
    const cart_id = arr1[1];
    const response = await axios.delete(
      `https://asif-online-shop-server.herokuapp.com/api/${userName}/cartItems/${cart_id}`
    );
    //console.log(response.data);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartStatus: "idle",
    cartItems: [],
    total_price: 0,
    discount: 0,
    shipping: 0,
    total_bill: 0,
    cartError: null,
  },
  reducers: {
    cartCalc: (state, action) => {
      const arr1 = action.payload.map(item => item.productPrice);
      let sum = 0;
      for(let val of arr1) {
        sum = sum + val;
      };
     // state.shipping = 15;
      state.total_price = sum;
      state.total_bill = state.total_price + state.discount + state.shipping;
      // for (const key in state.user) {
      //     delete state.user[key];
      //   }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.cartStatus = "loading";
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartStatus = "succeeded";
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.cartStatus = "failed";
      state.cartError = action.error.message;
    });
    builder.addCase(deleteCartItems.fulfilled, (state, action) => {
      state.cartItems.length = 0;
      state.cartStatus = "idle";
      state.total_price = 0;
    state.discount = 0;
    state.shipping = 0;
    state.total_bill = 0;
    });
  },
});

// export const getCartAll = (state) => state.cart;
// export const getCartId = (state) => state.cart.cart?._id;
// export const getCart = (state) => state.cart.cart;
// export const getCartStatus = (state) => state.cart.status;
// export const getCartError = (state) => state.cart.error;
export const { cartCalc } = cartSlice.actions;
export default cartSlice.reducer;
