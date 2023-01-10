import { forwardRef, useCallback, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "../../../store/orders";
import { formatPrice } from "../../../utils/formatPrice";

export const CartItem = forwardRef(({ cartItem }, ref) => {
  const handleScrollIntoView = useCallback(() => {
    ref?.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [ref]);

  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    const currentOrder = JSON.parse(
      window.localStorage.getItem("currentOrder")
    );
    if (currentOrder.length) {
      const updatedOrder = currentOrder.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );

      window.localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
    }
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    const currentOrder = JSON.parse(
      window.localStorage.getItem("currentOrder")
    );
    if (currentOrder.length) {
      const updatedOrder = currentOrder
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      window.localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
    }
    dispatch(decrementQuantity(itemId));
  };

  const handleRemoveFromCart = (itemId) => {
    const currentOrder = JSON.parse(
      window.localStorage.getItem("currentOrder")
    );
    if (currentOrder.length) {
      const updatedOrder = currentOrder.filter((item) => item.id !== itemId);
      window.localStorage.setItem("currentOrder", JSON.stringify(updatedOrder));
    }
    dispatch(removeItemFromCart(itemId));
  };

  useEffect(() => {
    handleScrollIntoView();
  }, [handleScrollIntoView]);

  return (
    <div className="order-item-card" ref={ref}>
      <div>
        <img
          className="order-item-image"
          src={cartItem.imageUrl}
          alt={cartItem.name}
        />
      </div>
      <div className="order-detail-right">
        <div>{cartItem.name}</div>
        <div className="order-item-price">{formatPrice(cartItem.price)}</div>
        <div className="qty-change-section">
          <div className="qty-button">
            <button
              className="minus-button"
              onClick={() => handleDecrement(cartItem.id)}
            >
              -
            </button>
            <span className="qty">{cartItem.quantity}</span>
            <button
              className="plus-button"
              onClick={() => handleIncrement(cartItem.id)}
            >
              +
            </button>
          </div>
          <span
            className="delete-button"
            role="button"
            onClick={() => handleRemoveFromCart(cartItem.id)}
          >
            <RiDeleteBin5Fill />
          </span>
        </div>
      </div>
    </div>
  );
});
