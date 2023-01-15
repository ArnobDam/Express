import { useSelector } from "react-redux";
import { selectProductById } from "../../../store/products";
import { formatPrice } from "../../../utils/formatPrice";

export function HistoryProductItem({ productId, totalPrice, quantity }) {
  const product = useSelector((state) => selectProductById(state, productId));

  return (
    <>
      <div className="history-order-breakdown">
        <div>
          <img
            className="history-img"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="each-order-detail">
          <div>{product.name}</div>
          <div className="detail-price">
            <div className="detail-qty-section">
              <div className="detail-each-price">
                <div>{formatPrice(product.price)}</div>
                <div className="detail-qty">x {quantity}</div>
              </div>
            </div>
            <div className="detail-total">{formatPrice(totalPrice)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
