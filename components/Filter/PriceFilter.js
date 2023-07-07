import React from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilters,
  setFilters,
} from "../../store/features/products/productsSlice";

const generateFilterFunction =
  (value = 200) =>
  (a) =>
    a.price <= value;

const FILTER = {
  id: "price",
  name: "Price Max",
  type: "slider",
  min: 0,
  max: 200,
};

const PriceFilter = () => {
  const selectedOptions = useSelector(selectFilters(FILTER.id));
  const dispatch = useDispatch();

  const onChange = (value) => {
    const fn = generateFilterFunction(value); // filterFunction

    dispatch(setFilters({ [FILTER.id]: { value, fn } }));
  };

  return (
    <Filter
      filter={FILTER}
      defaultValue={selectedOptions.value}
      onValueChange={onChange}
    />
  );
};

export default PriceFilter;
