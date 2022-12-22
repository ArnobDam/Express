import { ResponsivePie } from "@nivo/pie";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { selectCurrentCartItemsExpanded } from "../../../store/orders";

// const selectCategoryNameFromId = createSelector(
//   state => state.categories.entities,
//   (_categories, categoryId) => categoryId,
//   (categories, categoryId) => categories[categoryId]
// )
const samplePieData = [
  {
    id: "java",
    label: "java",
    value: 78,
    color: "hsl(151, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 163,
    color: "hsl(50, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 562,
    color: "hsl(106, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 450,
    color: "hsl(30, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 577,
    color: "hsl(206, 70%, 50%)",
  },
];
const getCategoryName = (categoryId) => {
  if (categoryId === '63a47615ad6d4fe86b6daf74') {
    return 'Sandwhiches'
  }
}

export function PieChart({ data }) {

  const currentOrder = useSelector(selectCurrentCartItemsExpanded);
  // console.log(data)
  console.log(currentOrder)

  const idConverter = (idString) => {
    console.log(idString)
    if (idString == "63a47615ad6d4fe86b6daf74") {
      return ("Sandwiches");
    } else {
      return idString;
    }
  }

  return (
    <ResponsivePie
      data={currentOrder}
      value="totalPrice"
      // id="name"
      id={idConverter("id")}
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
