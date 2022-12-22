import { createRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCategoriesListForRow } from "../../../store/categories";
import { addOrderItem } from "../../../store/orders";
import { selectCurrentProduct } from "../../../store/products";
import {
  closeModal,
  selectIsAddNewItemToCartModalOpen,
} from "../../../store/ui";
import { formatCategoryTitle } from "../../../utils/formatCategoryTitle";
import { formatPrice } from "../../../utils/formatPrice";
import { Modal } from "../../shared/components/Modal";
import { ProductRow } from "./ProductRow";
import "./ProductsList.css";

// const SANDWICH_ID = "63a47615ad6d4fe86b6daf6f";
// const SALAD_ID = "63a47615ad6d4fe86b6daf70";
// const SOUP_ID = "63a47615ad6d4fe86b6daf71";
// const DRINK_ID = "63a47615ad6d4fe86b6daf72";
// const BAKERY_ID = "63a47615ad6d4fe86b6daf73";

// const categories = [
//   { id: SANDWICH_ID, title: "🥪 Sandwiches" },
//   { id: SALAD_ID, title: "🥗 Salads" },
//   { id: SOUP_ID, title: "🥣 Soups" },
//   { id: DRINK_ID, title: "🍹 Drinks" },
//   { id: BAKERY_ID, title: "🍰 Bakery" },
//   // { id: 6, title: "🍟 Sides" },
// ];

// const CATEGORY_IDS = [
//   { id: SANDWICH_ID, title: "Sandwiches" },
//   { id: SALAD_ID, title: "Salads" },
//   { id: SOUP_ID, title: "Soups" },
//   { id: DRINK_ID, title: "Drinks" },
//   { id: BAKERY_ID, title: "Bakery" },
// ];

export function ProductsList() {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesListForRow, shallowEqual);

  const scrollRefs = categoriesList.reduce((prev, curr) => {
    prev[curr.id] = createRef();
    return prev;
  }, {});

  const handleScrollIntoView = (id) => {
    scrollRefs[id]?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const isAddItemToCartModalOpen = useSelector(
    selectIsAddNewItemToCartModalOpen
  );
  const currentProduct = useSelector(selectCurrentProduct, shallowEqual);

  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setQuantity(1);
    dispatch(closeModal());
  };

  const handleAddProductToCart = (product) => {
    const newItem = {
      id: product._id,
      quantity,
      price: product.price,
      totalPrice: quantity * product.price,
    };
    dispatch(addOrderItem(newItem));
    handleCloseModal();
  };

  return (
    <div className="Order" style={{ position: "relative" }}>
      {isAddItemToCartModalOpen && currentProduct && (
        <Modal className="products-modal">
          <h1 className="product-modal-name">{currentProduct.name}</h1>
          <div className="product-modal-detail">
            <div>
              <img
                className="product-modal-image"
                src={currentProduct.imageUrl}
                alt={currentProduct.name}
                height="100px"
              />
            </div>
            <div className="product-modal-price">
              {formatPrice(currentProduct.price)}
            </div>
            <div className="product-modal-qty">
              <div>
                <button className="modal-qty-button" onClick={handleDecrement}>
                  -
                </button>
              </div>
              <div className="modal-qty">{quantity}</div>
              <div>
                <button className="modal-qty-button" onClick={handleIncrement}>
                  +
                </button>
              </div>
            </div>
            {/* <div>modifiers</div> */}
            <div className="modal-buttons">
              <button
                className="modal-add-button"
                onClick={() => handleAddProductToCart(currentProduct)}
              >
                Add
              </button>
              <button className="modal-cxl-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="category-list">
        {categoriesList.map((category) => (
          <div
            className="category-item"
            key={category.id}
            role="button"
            onClick={() => handleScrollIntoView(category.id)}
          >
            {formatCategoryTitle(category)}
          </div>
        ))}

        {/* <div role="button" className="new-category">
          Category +
        </div> */}

        {/* <Link to={"/menu"}>
          <div role="button" className="new-category">
            Category +
          </div>
        </Link> */}
      </div>
      <div className="ProductsList">
        <div className="category-container">
          {categoriesList.map((category) => (
            <ProductRow
              key={category.id}
              ref={scrollRefs[category.id]}
              title={category.title}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
