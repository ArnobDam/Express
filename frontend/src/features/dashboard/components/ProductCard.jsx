import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByCategory } from "../../../store/products";
import { showAddNewItemModal, showAddItemToCartModal } from "../../../store/ui";
import { formatPrice } from "../../../utils/formatPrice";
import "./ProductCard.css"
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";

export const ProductCard = forwardRef(
  ({ title, categoryId, create = false }, ref) => {
    const products = useSelector((state) =>
      selectProductsByCategory(state, categoryId)
    );

    const dispatch = useDispatch();

    const handleShowAddProductModal = (product) => {
      dispatch(showAddItemToCartModal(product));
    };

    const handleOpenAddNewModal = () => {
      dispatch(showAddNewItemModal());
    };

    return (
      <div className="ProductRow" ref={ref}>
        <div className="item-by-name">
          <div className="category-title">
            <span className="category-name">{title}</span>
            <span className="explore-more">Explore more</span>
          </div>
          <div className="item-container">
            {create && (
              <div
                className="item add-new-product"
                role="button"
                onClick={handleOpenAddNewModal}
              >
                <div className="add-button">+</div>
                <div>Add new dish</div>
              </div>
            )}
            {products.slice(0, create ? 3 : 4).map((product) => (
              <div
                className="product-card-item"
                key={product._id}
                onClick={() =>
                  create ? () => {} : handleShowAddProductModal(product)
                }
              >
                <img
                  className="food-image"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="menu-name">{product.name}</div>
                <div className="item-price">{formatPrice(product.price)}</div>
                <div className="edit-and-delete">
                  <div className="product-card-edit"><RiEdit2Fill/></div>
                <div className="product-card-delete"><RiDeleteBin5Fill/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);