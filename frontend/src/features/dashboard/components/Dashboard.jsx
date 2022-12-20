import {  useSelector } from "react-redux";
import "./Dashboard.css";
import {Sidebar} from "./Sidebar"
{
  /* <h1>Dashboard</h1>
      <h3>Welcome back {currentUser?.user?.username}</h3>
      <button onClick={() => dispatch(logout())}>Logout</button> */
}

export function Dashboard() {
  const currentUser = useSelector((state) => state.session);

  return (
    <div className="Dashboard">
      <div className="left">
        <Sidebar/>
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
