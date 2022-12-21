import "./Cart.css";
import foodimage from "./sandwich.png";
import { RiDeleteBin5Fill } from "react-icons/ri";

export function Cart() {
  return (
    <>
      <div className="cart-container">
        <div className="order-detail">
          <div className="order-number">Order #173</div>
          <div className="date">Dec 25 2022</div>
        </div>

        <div className="order-lists-container">
          <div className="item-cards-container">
            <div className="order-item-card">
              <div>
                <img className="order-item-image" src={foodimage} alt="food" />
              </div>
              <div className="order-detail-right">
                <div>Rice Shrimp</div>
                <div className="order-item-price">$9.10</div>
                <div className="qty-button">
                  <button className="minus-button">-</button>
                  <span className="qty">1</span>
                  <button className="plus-button">+</button>
                </div>
              </div>
            </div>
            <div className="order-item-card">
              <div>
                <img className="order-item-image" src={foodimage} alt="food" />
              </div>
              <div className="order-detail-right">
                <div>Rice Shrimp</div>
                <div className="order-item-price">$9.10</div>
                <div className="qty-change-section">
                <div className="qty-button">
                  
                  <button className="minus-button">-</button>
                  <span className="qty">1</span>
                  <button className="plus-button">+</button>
                
                  
                </div>
                <span className="delete-button"><RiDeleteBin5Fill/></span>
                </div>
               
              </div>
            </div>
            <div className="order-item-card">
              <div>
                <img className="order-item-image" src={foodimage} alt="food" />
              </div>
              <div className="order-detail-right">
                <div>Rice Shrimp</div>
                <div className="order-item-price">$9.10</div>
                <div className="qty-button">
                  <button className="minus-button">-</button>
                  <span className="qty">1</span>
                  <button className="plus-button">+</button>
                </div>
              </div>
            </div>
            <div className="order-item-card">
              <div>
                <img className="order-item-image" src={foodimage} alt="food" />
              </div>
              <div className="order-detail-right">
                <div>Rice Shrimp</div>
                <div className="order-item-price">$9.10</div>
                <div className="qty-button">
                  <button className="minus-button">-</button>
                  <span className="qty">1</span>
                  <button className="plus-button">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="receipt-container">Hello</div>
        </div>
      </div>
    </>
  );
}
