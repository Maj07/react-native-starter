import React from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortBy,
  setSort,
} from "../../store/features/products/productsSlice";
import { useState } from "react";
import { useEffect } from "react";

const SORT_FILTERS = {
  id: "sort",
  name: "Sort by",
  type: "radio",
  options: [
    {
      id: "asc",
      name: "Price low to hight",
      fn: (a, b) => a?.price > b?.price,
    },
    {
      id: "desc",
      name: "Price hight to low",
      fn: (a, b) => a?.price < b?.price,
    },
  ],
};

const SortBy = () => {
  const selectedOptions = useSelector(selectSortBy);
  const [defaultValue, setDefaultValue] = useState({});
  const dispatch = useDispatch();

  const onChange = (selectedValues) => {
    const key = Object.keys(selectedValues)[0];

    dispatch(setSort(selectedValues[key]));
  };

  useEffect(() => {
    if (selectedOptions) {
      setDefaultValue({ [selectedOptions?.id]: selectedOptions });
    } else {
      setDefaultValue({});
    }
  }, [selectedOptions]);

  return (
    <Filter
      filter={SORT_FILTERS}
      defaultValue={defaultValue}
      onValueChange={onChange}
    ></Filter>
  );
};

export default SortBy;
