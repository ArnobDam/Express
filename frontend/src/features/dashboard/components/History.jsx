import "./History.css";

import { useSelector } from "react-redux";
import { selectOrderHistoryList } from "../../../store/orders";
import { HistoryCard } from "./HistoryCard";

export function History() {
  const orderHistoryList = useSelector(selectOrderHistoryList);

  return (
    <>
      <div className="history-container">
        <div style={{ paddingTop: "10px" }}></div>
        <div className="history-order-container">
          {orderHistoryList?.map((history) => (
            <HistoryCard history={history} />
          ))}
        </div>
      </div>
    </>
  );
}
