import { ResponsivePie } from "@nivo/pie";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  selectCurrentCartItemsExpanded,
  selectCurrentCartItemsExpandedWithCategoryTitle,
  selectTotalWithTax,
} from "../../../store/orders";
import { formatPrice } from "../../../utils/formatPrice";

export function PieChart({ data }) {
  const currentOrder = useSelector(
    selectCurrentCartItemsExpandedWithCategoryTitle
  );
  // console.log(currentOrder);
  const currentOrderWithCategoryNames = [];

  for (let i = 0; i < currentOrder.length; i++) {
    currentOrderWithCategoryNames.push(currentOrder[i]);
    // console.log(currentOrder[i].category)
    if (currentOrder[i].categoryName === "Sandwiches") {
      currentOrderWithCategoryNames[i].categoryName = "Sandwiches";
      currentOrderWithCategoryNames[i].color = "#000000";
    } else if (currentOrder[i].categoryName === "Salads") {
      currentOrderWithCategoryNames[i].categoryName = "Salads";
    } else if (currentOrder[i].categoryName === "Soups") {
      currentOrderWithCategoryNames[i].categoryName = "Soups";
    } else if (currentOrder[i].categoryName === "Drinks") {
      currentOrderWithCategoryNames[i].categoryName = "Drinks";
    } else if (currentOrder[i].categoryName === "Bakery") {
      currentOrderWithCategoryNames[i].categoryName = "Bakery Items";
    } else {
      currentOrderWithCategoryNames[i].categoryName = "Other";
    }
  }

  const categoryNamesAndTotalPrices = [];

  for (let i = 0; i < currentOrderWithCategoryNames.length; i++) {
    //if element object with category name doesn't exist, add object and total price,
    //if if does exist, add to total price
    let currentCategoryName = currentOrderWithCategoryNames[i].categoryName;
    let categoryNameExists = false;
    let categoryNameExistsIndex;
    for (let i = 0; i < categoryNamesAndTotalPrices.length; i++) {
      if (categoryNamesAndTotalPrices[i].categoryName === currentCategoryName) {
        categoryNameExists = true;
        categoryNameExistsIndex = i;
      }
    }

    if (categoryNameExists) {
      categoryNamesAndTotalPrices[categoryNameExistsIndex].totalPrice +=
        currentOrderWithCategoryNames[i].totalPrice;
    } else {
      categoryNamesAndTotalPrices.push({
        categoryName: currentOrderWithCategoryNames[i].categoryName,
        totalPrice: currentOrderWithCategoryNames[i].totalPrice,
        color: "#000000",
      });
    }
  }

  // console.log(categoryNamesAndTotalPrices)

  // let totalPrice = 0;

  // if (!categoryNamesAndTotalPrices[0]) {
  //   totalPrice = 1;
  // } else {
  //   categoryNamesAndTotalPrices.forEach((obj) => {
  //     totalPrice += obj.totalPrice
  //   })

  // }
  // console.log(useSelector(selectTotalWithTax))

  // console.log(totalPrice);

  let customColors = [
    // 'rgb(127, 0, 0)',
    // 'rgb(179, 0, 0)',
    // 'rgb(215, 48, 31)',
    // 'rgb(239, 101, 72)',
    "rgb(252, 141, 89)",
    "rgb(253, 187, 132)",
    "rgb(253, 212, 158)",
    "rgb(254, 232, 200)",
    "rgb(255, 247, 236)",
  ];

  return (
    <ResponsivePie
      data={categoryNamesAndTotalPrices}
      value="totalPrice"
      id="categoryName"
      valueFormat={formatPrice}
      // id={idConverter("id")}
      // colors={{ scheme: "orange_red" }}
      colors={customColors}
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
      fill={
        [
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
        ]
      }
    />
  );
}
