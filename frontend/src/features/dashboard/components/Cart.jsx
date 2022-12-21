import "./Cart.css";
import foodimage from "./sandwich.png";
import { RiDeleteBin5Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import {BsFillCreditCard2BackFill} from "react-icons/bs"
import {MdQrCode} from "react-icons/md"
import { useState } from "react";


export function Cart() {
  const [counter, setCounter]= useState(1)
  const incrementCounter=()=> setCounter(counter+1)
  let decrementCounter=()=> setCounter(counter-1)

  if (counter<=0){
    decrementCounter=()=> setCounter(0)
  }

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
                <div className="qty-change-section">
                  <div className="qty-button">
                    <button className="minus-button" onClick={decrementCounter}>-</button>
                    <span className="qty">{counter}</span>
                    <button className="plus-button" onClick={incrementCounter}>+</button>
                  </div>
                  <span className="delete-button">
                    <RiDeleteBin5Fill />
                  </span>
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
                    <button className="minus-button" onClick={decrementCounter}>-</button>
                    <span className="qty">{counter}</span>
                    <button className="plus-button" onClick={incrementCounter}>+</button>
                  </div>
                  <span className="delete-button">
                    <RiDeleteBin5Fill />
                  </span>
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
                    <button className="minus-button" onClick={decrementCounter}>-</button>
                    <span className="qty">{counter}</span>
                    <button className="plus-button" onClick={incrementCounter}>+</button>
                  </div>
                  <span className="delete-button">
                    <RiDeleteBin5Fill />
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="order-item-card">
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
            </div> */}
          </div>

          <div className="receipt-container">
            <div className="payment">
              <div className="receipt-text">Receipt</div>
              <div className="payment-text">Payment</div>
            </div>
            <div className="payment-method">
              <div className="payment-debit">
                <div><BsFillCreditCard2BackFill/></div>
                <div>Debit</div></div>
              <div className="payment-cash">
                <div><RiMoneyDollarCircleFill/></div>
                <div>Cash</div></div>
              <div className="payment-code">
                <div><MdQrCode/></div>
                <div>Code</div>
                </div>
            </div>
            <div className="total-container">
              <div className="sub-total">
                <div>Subtotal</div>
                <div className="amount"> $47.00</div>
              </div>
              <div className="sub-total">
                <div>Discount</div>
                <div className="amount">-$5.00</div>
              </div>
              <div className="sales-tax">
                <div>Sales tax</div>
                <div className="amount">$2.00</div>
              </div>
            </div>
            <div className="total-text">
              <div>Total</div>
              <div className="amount"> $ 40.00</div>
            </div>
            <div>
              <button className="order-button">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
