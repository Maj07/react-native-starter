import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cart/cartSlice";
import productsSliceReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
