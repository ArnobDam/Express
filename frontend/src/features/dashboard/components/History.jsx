import "./History.css";

import { useSelector } from "react-redux";
import { selectOrderHistoryList } from "../../../store/orders";
import { HistoryCard } from "./HistoryCard";

// TODO: style no history and heading
export function History() {
  const orderHistoryList = useSelector(selectOrderHistoryList);

  return (
    <>
      <div className="history-container">
        <div style={{ paddingTop: "10px" }}></div>
        <div className="history-order-container">
          <h2 className="history-title">History</h2>
          {orderHistoryList.length === 0 && <p>No orders yet</p>}
          {orderHistoryList?.map((history) => (
            <HistoryCard history={history} key={history._id} />
          ))}
        </div>
      </div>
    </>
  );
}
