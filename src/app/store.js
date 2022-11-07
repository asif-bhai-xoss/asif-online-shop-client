import { configureStore } from "@reduxjs/toolkit";
import allUsersSlice from "../features/allUsersSlice";
import cartSlice from "../features/cartSlice";
import orderSlice from "../features/orderSlice";
import productsSlice from "../features/productsSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        products: productsSlice,
        users: allUsersSlice,
        user: userSlice,
        cartItems: cartSlice,
        orderItems: orderSlice,
        devTools: true,
    }
})

export default store;