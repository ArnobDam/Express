import { useSelector } from "react-redux";

const selectProductsByCategory = (categoryId) => (state) => {
  const products = Object.values(
    state?.products?.entities ? state.products.entities : {}
  );

  return products.filter((product) => product.category === categoryId);
};

function formatPrice(price){
  return (price/100).toLocaleString("en-US",{
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol"
  })}

export function ProductRow({ title, categoryId }) {
  const products = useSelector(selectProductsByCategory(categoryId));

  return (
    <>
      <div className="item-by-name">
        <div className="category-title">
          <span className="category-name">{title}</span>
          <span className="explore-more"> Explore more</span>
        </div>
        <div className="item-container">
          {products.slice(0, 4).map((product) => (
            <div className="item" key={product._id}>
              <img
                className="food-image"
                src={product.imageUrl}
                alt={product.name}
              />
              <div className="menu-name">{product.name}</div>
              <div className="item-price">{formatPrice(product.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
