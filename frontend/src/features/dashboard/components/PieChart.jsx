import { ResponsivePie } from "@nivo/pie";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { selectCurrentCartItemsExpanded } from "../../../store/orders";

export function PieChart({ data }) {

  const currentOrder = useSelector(selectCurrentCartItemsExpanded);

  const currentOrderWithCategoryNames = [];

  for (let i=0; i<currentOrder.length; i++) {
    currentOrderWithCategoryNames.push(currentOrder[i]);
    // console.log(currentOrder[i].category) 
    if (currentOrder[i].category === "63a47615ad6d4fe86b6daf6f") {
      currentOrderWithCategoryNames[i].categoryName = "Sandwiches"
    } else if (currentOrder[i].category === "63a47615ad6d4fe86b6daf70") {
      currentOrderWithCategoryNames[i].categoryName = "Salads"
    } else if (currentOrder[i].category === "63a47615ad6d4fe86b6daf71") {
      currentOrderWithCategoryNames[i].categoryName = "Soups"
    } else if (currentOrder[i].category === "63a47615ad6d4fe86b6daf72") {
      currentOrderWithCategoryNames[i].categoryName = "Drinks"
    } else if (currentOrder[i].category === "63a47615ad6d4fe86b6daf73") {
      currentOrderWithCategoryNames[i].categoryName = "Bakery Items"
    } else {
      currentOrderWithCategoryNames[i].categoryName = "Other"
    }
  }

  const categoryNamesAndTotalPrices = [];

  for (let i=0; i<currentOrderWithCategoryNames.length; i++) {
    //if element object with category name doesn't exist, add object and total price,
    //if if does exist, add to total price
    let currentCategoryName = currentOrderWithCategoryNames[i].categoryName;
    let categoryNameExists = false;
    let categoryNameExistsIndex;
    for (let i=0; i<categoryNamesAndTotalPrices.length; i++) {
      if (categoryNamesAndTotalPrices[i].categoryName === currentCategoryName) {
        categoryNameExists = true;
        categoryNameExistsIndex = i;
      }
    }

    if (categoryNameExists) {
      categoryNamesAndTotalPrices[categoryNameExistsIndex].totalPrice += currentOrderWithCategoryNames[i].totalPrice;
    } else {
      categoryNamesAndTotalPrices.push(
        {categoryName: currentOrderWithCategoryNames[i].categoryName,
        totalPrice: currentOrderWithCategoryNames[i].totalPrice}
        )
    }
  }

  console.log(categoryNamesAndTotalPrices)

  // console.log(currentOrderWithCategoryNames)

  return (
    <ResponsivePie
      data={categoryNamesAndTotalPrices}
      value="totalPrice"
      id="categoryName"
      // id={idConverter("id")}
      colors={{ scheme: "orange_red" }}
      margin={{ top: 10, right: 30, bottom: 10, left: 10 }}
      innerRadius={0.8}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "blue",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        // {
        //   match: {
        //     id: "63a47615ad6d4fe86b6daf90",
        //   },
        // },
        // {
        //   match: {
        //     id: "ruby",
        //   },
        //   id: "dots",
        // },
        // {
        //   match: {
        //     id: "c",
        //   },
        //   id: "dots",
        // },
        // {
        //   match: {
        //     id: "go",
        //   },
        //   id: "dots",
        // },
        // {
        //   match: {
        //     id: "python",
        //   },
        //   id: "dots",
        // },
        // {
        //   match: {
        //     id: "scala",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "lisp",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "elixir",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "javascript",
        //   },
        //   id: "lines",
        // },
      ]}
    />
  );
}
