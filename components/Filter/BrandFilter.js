import React from "react";
import Filter from "./Filter";
import { withMultipleChoice } from "./withMultipleChoice";

const generateFilterFunction = (values) => (item) =>
  values.includes(item.brand);

const BRAND_FILTER = {
  id: "brand",
  name: "Brand",
  type: "checkbox",
  options: [
    {
      id: "nike",
      name: "Nike Sportswear",
    },
    {
      id: "adidas",
      name: "Adidas Originals",
    },
    {
      id: "new-balance",
      name: "New Balance",
    },
    {
      id: "puma",
      name: "Puma",
    },
  ],
};

export default withMultipleChoice(
  BRAND_FILTER,
  ({ name }) => name,
  generateFilterFunction
)(Filter);
