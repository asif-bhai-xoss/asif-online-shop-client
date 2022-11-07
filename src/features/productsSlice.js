import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const product_url = "http://localhost:5000/api/products";

const initialState = {
    isLoading: false,
        products: [],
        error: null
};

export const fetchProducts = createAsyncThunk("api/products/fetchProducts", async() => {
    const res = await axios.get(product_url);
    return res.data;
})


const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export default productsSlice.reducer;