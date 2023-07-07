import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilterById,
  selectFilters,
  setFilters,
} from "../../store/features/products/productsSlice";

export const withMultipleChoice =
  (filter, mapValuesFn, filterFn) => (Component) => (props) => {
    const selectedOptions = useSelector(selectFilters(filter.id));
    const dispatch = useDispatch();

    const onChange = (selectedValues) => {
      const hasValues = Object.keys(selectedValues).length > 0;

      if (!hasValues) {
        dispatch(deleteFilterById(filter.id));
        return;
      }

      const values = Object.values(selectedValues).map(mapValuesFn);
      const fn = filterFn(values);

      dispatch(setFilters({ [filter.id]: { ...selectedValues, fn } }));
    };

    return (
      <Component
        filter={filter}
        defaultValue={selectedOptions}
        onValueChange={onChange}
      />
    );
  };
