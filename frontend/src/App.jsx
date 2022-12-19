import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { getCurrentUser } from "./store/session";

export function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <div className="App">
          <Outlet />
        </div>
      </>
    )
  );
}
