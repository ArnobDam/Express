import { createRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addOrderItem } from "../../../store/orders";
import { selectCurrentProduct } from "../../../store/products";
import { closeModal } from "../../../store/ui";
import { formatPrice } from "../../../utils/formatPrice";
import { Modal } from "../../shared/components/Modal";
import { ProductRow } from "./ProductRow";
import "./ProductsList.css";

const SANDWICH_ID = "63a321d938a679217e604707";
const SALAD_ID = "63a321d938a679217e604708";
const SOUP_ID = "63a321d938a679217e604709";
const DRINK_ID = "63a321d938a679217e60470a";
const BAKERY_ID = "63a321d938a679217e60470b";

const categories = [
  { id: SANDWICH_ID, title: "🥪 Sandwiches" },
  { id: SALAD_ID, title: "🥗 Salads" },
  { id: SOUP_ID, title: "🥣 Soups" },
  { id: DRINK_ID, title: "🍹 Drinks" },
  { id: BAKERY_ID, title: "🍰 Bakery" },
  // { id: 6, title: "🍟 Sides" },
];

const CATEGORY_IDS = [
  { id: SANDWICH_ID, title: "Sandwiches" },
  { id: SALAD_ID, title: "Salads" },
  { id: SOUP_ID, title: "Soups" },
  { id: DRINK_ID, title: "Drinks" },
  { id: BAKERY_ID, title: "Bakery" },
];

export function ProductsList() {
  const dispatch = useDispatch();

  const scrollRefs = CATEGORY_IDS.reduce((prev, curr) => {
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
    (state) => state.ui.modal === "add_item_to_cart"
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
        {categories.map((category) => (
          <div
            className="category-item"
            key={category.id}
            role="button"
            onClick={() => handleScrollIntoView(category.id)}
          >
            {category.title}
          </div>
        ))}

        <div role="button" className="new-category">
          Category +
        </div>

        {/* <Link to={"/menu"}>
          <div role="button" className="new-category">
            Category +
          </div>
        </Link> */}
      </div>
      <div className="ProductsList">
        <div className="category-container">
          {CATEGORY_IDS.map((category) => (
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
