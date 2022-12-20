import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import "./Dashboard.css";

{
  /* <h1>Dashboard</h1>
      <h3>Welcome back {currentUser?.user?.username}</h3>
      <button onClick={() => dispatch(logout())}>Logout</button> */
}

export function Dashboard() {
  const currentUser = useSelector((state) => state.session);
  const dispatch = useDispatch();

  return (
    <div className="Dashboard">
      <div className="left">
        <h1>EXPRESS</h1>
        <input type="search" />
        <h2>Dashboard</h2>
        <div>
          <p>Link1</p>
          <p>Link2</p>
          <p>Link3</p>
        </div>
      </div>
      <div className="center">
        <h2>Choose category</h2>
        <div>
          <p>cat1</p>
          <p>cat2</p>
        </div>
      </div>
      <div className="right">
        <h2>current Order</h2>
      </div>
    </div>
  );
}
