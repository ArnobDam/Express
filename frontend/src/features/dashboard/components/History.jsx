import "./History.css";
import { HistoryCard } from "./HistoryCard";
import { useEffect } from "react";
import { jwtFetch } from "../../../store/jwt";
import { useState } from "react";
import { Spinner } from "../../shared/components/Spinner";

export function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const response = await jwtFetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (ex) {
        setErrors(ex.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (errors) {
    return null;
  }

  return (
    <>
      <div className="history-container">
        <div style={{ paddingTop: "10px" }}></div>
        <div className="history-order-container">
          <h2 className="history-title">Recent Orders</h2>
          {loading && (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </div>
          )}
          {orders.length === 0 && !loading && <p>No orders yet</p>}
          {!loading &&
            orders?.map((history) => (
              <HistoryCard history={history} key={history._id} />
            ))}
        </div>
      </div>
    </>
  );
}
