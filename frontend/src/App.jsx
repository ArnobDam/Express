import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

export function App() {
  return (
    <>
      <div>
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/signup"}>Register</NavLink>
      </div>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}
