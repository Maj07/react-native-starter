import React from "react";
import Filter from "./Filter";
import { withMultipleChoice } from "./withMultipleChoice";

const generateFilterFunction = (values) => (item) =>
  item?.color?.some?.((c) => values.includes(c?.hex));

const COLOR_FILTER = {
  id: "color",
  name: "Color",
  type: "checkbox",
  options: [
    {
      id: "white",
      name: "White",
      hex: "#ffffff",
    },
    {
      id: "black",
      name: "Black",
      hex: "#000000",
    },
    {
      id: "gray",
      name: "Gray",
      hex: "#808080",
    },
    {
      id: "red",
      name: "Red",
      hex: "#ff0000",
    },
    {
      id: "green",
      name: "Green",
      hex: "#008000",
    },
    {
      id: "blue",
      name: "Blue",
      hex: "#0000ff",
    },
  ],
};

export default withMultipleChoice(
  COLOR_FILTER,
  ({ hex }) => hex,
  generateFilterFunction
)(Filter);
