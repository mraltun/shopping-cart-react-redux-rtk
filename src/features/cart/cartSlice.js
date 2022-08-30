// Slice as a feature.
import { createSlice } from "@reduxjs/toolkit";
// Temporary data from a file
import cartItems from "../../data/cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 10,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // We don't need to return new state and we always avoid the mutation. We can mutate state here due to RTK (Immer)
      state.cartItems = [];
    },
    // Action has type and payload properties
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount++;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount--;
    },
  },
});

// We don't need to set any actions and action creators
export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

// Export the slice's reducer property
export default cartSlice.reducer;
