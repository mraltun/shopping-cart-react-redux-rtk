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
});

// Export the slice's reducer property
export default cartSlice.reducer;
