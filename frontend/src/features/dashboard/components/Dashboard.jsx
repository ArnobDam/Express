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
       
        <div className="category">
          <div>cat1</div>
          <div>cat2</div>
        </div>
      </div>
      <div className="right">
        <h2>current Order</h2>
      </div>
    </div>
  );
}
