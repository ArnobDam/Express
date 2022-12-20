const categories = [
  { id: 1, title: "🥪 Sandwhiches" },
  { id: 2, title: "🥗 Salads" },
  { id: 3, title: "🥣 Soups" },
  { id: 4, title: "🍹 Drinks" },
  { id: 5, title: "🍟 Sides" },
  // { id: 6, title: "🍰 Dessert" },
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
        <div className="item-by-name">
          <div className="category-title">
            <span className="category-name">Food</span>
            <span className="explore-more"> Explore more</span>
          </div>
          <div className="item-container">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </div>
    </>
  );
}
