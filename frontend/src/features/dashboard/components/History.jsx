import "./History.css";
import { BsCheckCircleFill } from "react-icons/bs";
import sand from "./sandwich.png"

export function History() {
  return (
    <>
      <div className="history-container">
        <div style={{ paddingTop: "10px" }}></div>
        <div className="history-order-container">
        <div className="history-order">
          <div className="history-order-detail-container">
          <div className="history-order-left">
            <div className="checkmark">
              <BsCheckCircleFill />
            </div>
            <div className="history-order-detail">
              <div className="history-order-number">Order #1534457</div>
              <div className="history-payment">has been paid successfully</div>
              <div className="history-detail">See detail</div>
            </div>
          </div>
          <div className="history-order-right">
            <div className="history-time">10 min ago</div>
            <div className="history-payment-detail">
              <div className="history-price">$40.50</div>
              <div className="history-payment-method">Credit Card</div>
            </div>
          </div>
          </div>
       
        <div className="history-order-breakdown">
          <div><img className="history-img" src={sand} alt="" /></div>
          <div className="each-order-detail">
          <div>name</div>
          <div className="detail-price">
            <div className="detail-qty-section">
          <div className="detail-each-price">$20.00</div>
    
          <div className="detail-qty">x 3</div>
          </div>
          <div className="detail-total">$60.00</div>
       
          </div>
          </div>
        </div>
        <div className="history-order-breakdown">
          <div><img className="history-img" src={sand} alt="" /></div>
          <div className="each-order-detail">
          <div>name</div>
          <div className="detail-price">
            <div className="detail-qty-section">
          <div className="detail-each-price">$20.00</div>
    
          <div className="detail-qty">x 3</div>
          </div>
          <div className="detail-total">$60.00</div>
       
          </div>
          </div>
        </div>
        

        </div>
        </div>
      </div>
    </>
  );
}
