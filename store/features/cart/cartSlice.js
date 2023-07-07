import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItemToCart, removeItemFromCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const nbItemsInCart = (state) => state.cart.items.length;
export const itemExistInCart = (id) => (state) =>
  state.cart.items.some((i) => i.id === id);

export default cartSlice.reducer;
