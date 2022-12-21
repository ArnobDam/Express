import "./Cart.css";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { MdQrCode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderAsync,
  selectCurrentCartItemsExpanded,
} from "../../../store/orders";
import { CartItem } from "./CartItem";
import { createRef } from "react";
import { format } from "date-fns";

const TODAY = format(Date.now(), "LLL d yyyy");
// TODO: DOESN'tWORK!
const generateOrderNumber = () => {
  let number = 0;
  ++number;
  if (number < 100) {
    return `00${number}`;
  }
  return `${number}`;
};

export function Cart() {
  const dispatch = useDispatch();

  const currentCartItems = useSelector(selectCurrentCartItemsExpanded);

  const scrollRefs = currentCartItems.reduce((prev, curr) => {
    prev[curr.id] = createRef();
    return prev;
  }, {});

  return (
    <>
      <div className="cart-container">
        <div className="order-detail">
          <div className="order-number">Order #{generateOrderNumber()}</div>
          <div className="date">{TODAY}</div>
        </div>

        <div className="order-lists-container">
          <div className="item-cards-container">
            {currentCartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                ref={scrollRefs[cartItem.id]}
              />
            ))}
          </div>

          <div className="receipt-container">
            <div className="payment">
              <div className="receipt-text">Receipt</div>
              <div className="payment-text">Payment</div>
            </div>
            <div className="payment-method">
              <div className="payment-debit">
                <div>
                  <BsFillCreditCard2BackFill />
                </div>
                <div>Debit</div>
              </div>
              <div className="payment-cash">
                <div>
                  <RiMoneyDollarCircleFill />
                </div>
                <div>Cash</div>
              </div>
              <div className="payment-code">
                <div>
                  <MdQrCode />
                </div>
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
              <button
                className="order-button"
                onClick={() => dispatch(createOrderAsync())}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
