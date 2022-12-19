import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

export function App() {
  return (
    <>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}
