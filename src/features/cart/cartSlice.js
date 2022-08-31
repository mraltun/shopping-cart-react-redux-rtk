// Slice as a feature.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Temporary data from a file
import cartItems from "../../data/cartItems";

// Data from aPI
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: 10,
  total: 0,
  isLoading: true,
};

// First part is action type, second part is callback function which needs to return promise
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // We don't need to return new state and we always avoid the mutation. We can mutate state here due to RTK (Immer)
      state.cartItems = [];
    },
    // Action has "type" and "payload" properties
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
  // Lifecycle actions
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// We don't need to set any actions and action creators, they are set up automatically by createSlice
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

// Export the slice's reducer property
export default cartSlice.reducer;
