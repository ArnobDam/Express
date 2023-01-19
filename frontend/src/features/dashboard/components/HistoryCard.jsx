import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { formatPrice } from "../../../utils/formatPrice";
import { formatDistanceToNow } from "date-fns";
import { HistoryProductItem } from "./HistoryProductItem";

export function HistoryCard({ history }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="history-order">
      <div className="history-order-detail-container">
        <div className="history-order-left">
          <div className="checkmark">
            <BsCheckCircleFill />
          </div>
          <div className="history-order-detail">
            <div className="history-order-number">Order #{history.number}</div>
            <div className="history-payment">has been paid successfully</div>
            <div
              className="history-detail"
              role="button"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? "Hide details" : "See details"}
            </div>
          </div>
        </div>
        <div className="history-order-right">
          <div className="history-time">
            {formatDistanceToNow(new Date(history.createdAt), {
              addSuffix: true,
            })}
          </div>
          <div className="history-payment-detail">
            <div className="history-price">
              {formatPrice(history.totalPrice)}
            </div>
            <div className="history-payment-method">
              {history?.notes === "credit" || !history?.notes
                ? "Credit Card"
                : history?.notes}
            </div>
          </div>
        </div>
      </div>
      {showDetails &&
        history.products.map((product, index) => (
          <HistoryProductItem
            key={`${product._id}-${index}`}
            productId={product._id}
            totalPrice={product.totalPrice}
            quantity={product.quantity}
          />
        ))}
    </div>
  );
}
