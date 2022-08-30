// A better createStore
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

// Combine reducers in a single object. Each reducer controls a slice.
export const store = configureStore({
  reducer: { cart: cartReducer },
});
