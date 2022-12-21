import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByCategory } from "../../../store/products";
import { showModal } from "../../../store/ui";
import { formatPrice } from "../../../utils/formatPrice";

export const ProductRow = forwardRef(({ title, categoryId }, ref) => {
  const products = useSelector((state) =>
    selectProductsByCategory(state, categoryId)
  );

  const dispatch = useDispatch();

  const handleShowAddProductModal = (product) => {
    dispatch(showModal(product));
  };

  return (
    <div className="ProductRow" ref={ref}>
      <div className="item-by-name">
        <div className="category-title">
          <span className="category-name">{title}</span>
          <span className="explore-more">Explore more</span>
        </div>
        <div className="item-container">
          {products.slice(0, 4).map((product) => (
            <div
              className="item"
              key={product._id}
              onClick={() => handleShowAddProductModal(product)}
            >
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
    </div>
  );
});
