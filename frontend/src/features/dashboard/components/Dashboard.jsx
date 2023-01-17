import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { Home } from "./Home";
import { MenuManager } from "./MenuManager";
import { ProductsList } from "./ProductsList";
import { Sidebar } from "./Sidebar";
import { Cart } from "./Cart";
import { About } from "./About";
import { History } from "./History";
import { useDispatch } from "react-redux";
import { fetchProductsAsync } from "../../../store/products";
import { fetchCategoriesAsync } from "../../../store/categories";

export function Dashboard() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace("/menu");
    }
  }, [location.pathname, history]);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="Dashboard">
      <div className="left">
        <Sidebar />
      </div>
      <div className="center">
        <Switch>
          <Route exact path={"/dashboard"}>
            <Home />
          </Route>
          <Route exact path={"/settings"}>
            <MenuManager />
          </Route>
          <Route exact path={"/menu"}>
            <ProductsList />
          </Route>
          <Route exact path={"/history"}>
            <History />
          </Route>
          <Route exact path={"/about"}>
            <About />
          </Route>
        </Switch>
      </div>
      <div className="right">
        <Cart />
      </div>
    </div>
  );
}
