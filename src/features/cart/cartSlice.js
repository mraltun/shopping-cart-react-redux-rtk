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
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// We don't need to set any actions and action creators
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

// Export the slice's reducer property
export default cartSlice.reducer;
