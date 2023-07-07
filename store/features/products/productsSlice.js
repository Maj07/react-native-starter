import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filters: {},
  sort: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = [...action.payload];
    },
    setFilters: (state, action) => {
      /*
      Filters are type of :
       {
        [filter.id]: {
          fn: Function to filter
          [selectedOption.id]: {
            id: X,
            ...
          }
        }
       }

       ex: 
       {
        "color": {
          fn: (e) => e.some(c => ['black', 'yellow'].includes(c))
          "black": {
            id: "black",
            ...
          },
          "yellow": {
            id: "yellow",
            ...
          },
        }
       }

       with that structure its easy to find or delete a filter
      */
      state.filters = { ...state.filters, ...action.payload };
    },
    deleteFilterById: (state, action) => {
      const filters = { ...state.filters };
      const idToDelete = action.payload;

      if (filters[idToDelete]) {
        delete filters[idToDelete];
      }

      state.filters = { ...filters };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: (state, action) => {
      state.filters = {};
      state.sort = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setFilters,
  setSort,
  deleteFilterById,
  resetFilters,
} = productsSlice.actions;

// Selectors
export const selectProducts = ({ products }) => {
  const { items, filters, sort } = products;
  let productList = [...items];
  const filtersIds = Object.keys(filters);

  // CHECK IF THERE IS FILTERS
  if (filtersIds.length > 0) {
    filtersIds.forEach((filterId) => {
      if (filters[filterId]?.fn) {
        productList = productList.filter(filters[filterId]?.fn);
      }
    });
  }

  if (sort?.fn) {
    productList.sort(sort.fn);
  }

  return productList || [];
};

export const selectSortBy = ({ products }) => products.sort;
export const selectFilters = (id) => (state) => {
  // return filters without fn
  const { fn, ...filter } = state.products.filters[id] || {};
  return filter;
};
export const selectNbOfFilters = (state) =>
  Object.keys(state.products.filters).length + (state.products.sort ? 1 : 0);

export default productsSlice.reducer;
