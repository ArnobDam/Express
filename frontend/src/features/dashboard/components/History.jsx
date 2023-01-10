import "./History.css";
import { HistoryCard } from "./HistoryCard";
import { useEffect } from "react";
import { jwtFetch } from "../../../store/jwt";
import { useState } from "react";

// TODO: style no history and heading
export function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await jwtFetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (ex) {
        console.error(ex.message);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <div className="history-container">
        <div style={{ paddingTop: "10px" }}></div>
        <div className="history-order-container">
          <h2 className="history-title">Recent Orders</h2>
          {orders.length === 0 && <p>No orders yet</p>}
          {orders?.map((history) => (
            <HistoryCard history={history} key={history._id} />
          ))}
        </div>
      </div>
    </>
  );
}
