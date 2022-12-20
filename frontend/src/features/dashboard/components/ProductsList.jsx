import food from "./sand.png";
import coke from "./coke.png";

const categories = [
  { id: 1, title: "🥪 Sandwiches" },
  { id: 2, title: "🥗 Salads" },
  { id: 3, title: "🥣 Soups" },
  { id: 4, title: "🍹 Drinks" },
  // { id: 5, title: "🍟 Sides" },
  { id: 6, title: "🍰 Bakery" },
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
            <div className="item">
              <img className="food-image" src={food} />
              <div className="menu-name">Rice Shrimp</div>
              <div className="item-price">$ 7.35</div>
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
        <div className="item-by-name">
          <div className="category-title">
            <span className="category-name">Drinks</span>
            <span className="explore-more"> Explore more</span>
          </div>
          <div className="item-container">
            <div className="item">
              <img className="food-image" src={coke} />
              <div className="menu-name">Coke</div>
              <div className="item-price">$ 5.00</div>
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
        
      </div>
    </>
  );
}
