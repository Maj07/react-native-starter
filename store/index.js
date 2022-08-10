import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
