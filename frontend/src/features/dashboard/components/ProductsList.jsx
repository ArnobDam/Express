import { ProductRow } from "./ProductRow";

const categories = [
  { id: 1, title: "🥪 Sandwiches" },
  { id: 2, title: "🥗 Salads" },
  { id: 3, title: "🥣 Soups" },
  { id: 4, title: "🍹 Drinks" },
  // { id: 5, title: "🍟 Sides" },
  { id: 6, title: "🍰 Bakery" },
];

// const selectProductsList = (state) =>
//   Object.values(state.products.entities ?? {});
// const selectCategoriesList = (state) =>
//   Object.values(state.categories.entities);

const SANDWICH_ID = "63a224e864d88295284214c8";
const SALAD_ID = "63a224e864d88295284214c9";
const SOUP_ID = "63a224e864d88295284214ca";
const DRINK_ID = "63a224e864d88295284214cb";
const BAKERY_ID = "63a224e864d88295284214cc";

const CATEGORY_IDS = [
  { id: SANDWICH_ID, title: "Sandwiches" },
  { id: SALAD_ID, title: "Salads" },
  { id: SOUP_ID, title: "Soups" },
  { id: DRINK_ID, title: "Drinks" },
  { id: BAKERY_ID, title: "Bakery" },
];

export function ProductsList() {
  return (
    <>
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-item" key={category.id}>
            {category.title}
          </div>
        ))}
        <div className="new-category">Category + </div>
      </div>
      <div className="category-container">
        {CATEGORY_IDS.map((category) => (
          <ProductRow
            key={category.id}
            title={category.title}
            categoryId={category.id}
          />
        ))}
      </div>
    </>
  );
}
