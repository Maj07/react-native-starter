import { createSlice } from '@reduxjs/toolkit';

import { Product } from '@models/Product';

interface IProductsSliceState {
  items: Product[];
}

const initialState: IProductsSliceState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (
      state,
      action: {
        payload: Product[];
        type: string;
      },
    ) => {
      state.items = [...action.payload];
    },
    // more reducers ...
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions;

// Selectors
export const selectProducts = ({ products }) => {
  const { items } = products;
  const productList = [...items];

  return productList || [];
};

export default productsSlice.reducer;
