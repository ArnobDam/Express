import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import sand from "./sandwich.png";

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
          <div className="history-time">10 min ago</div>
          <div className="history-payment-detail">
            <div className="history-price">
              ${(history.totalPrice / 100).toFixed(2)}
            </div>
            <div className="history-payment-method">Credit Card</div>
          </div>
        </div>
      </div>
      {showDetails &&
        history.products.map((product) => (
          <React.Fragment key={product._id}>
            <div className="history-order-breakdown">
              <div>
                <img className="history-img" src={sand} alt="" />
              </div>
              <div className="each-order-detail">
                <div>{product.name}</div>
                <div className="detail-price">
                  <div className="detail-qty-section">
                    <div className="detail-each-price">each price</div>

                    <div className="detail-qty">x {product.quantity}</div>
                  </div>
                  <div className="detail-total">${(product.totalPrice/100).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </div>
  );
}
