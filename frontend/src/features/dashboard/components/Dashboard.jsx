import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../shared/components/Routes";
import "./Dashboard.css";
import { Home } from "./Home";
import { MenuManager } from "./MenuManager";
import { ProductsList } from "./ProductsList";
import { Sidebar } from "./Sidebar";
{
  /* <h1>Dashboard</h1>
      <h3>Welcome back {currentUser?.user?.username}</h3>
      <button onClick={() => dispatch(logout())}>Logout</button> */
}
const categories = [
  { id: 1, title: "🥪 Sandwhiches" },
  { id: 2, title: "🥗 Salads" },
  { id: 3, title: "🥣 Soups" },
  { id: 4, title: "🍹 Drinks" },
  { id: 5, title: "🍟 Sides" },
  // { id: 6, title: "🍰 Dessert" },
];

export function Dashboard() {
  const currentUser = useSelector((state) => state.session);

  return (
    <div className="Dashboard">
      <div className="left">
        <Sidebar />
      </div>
      <div className="center">
        {/* <ProductsList /> */}
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/order"}>
            <ProductsList />
          </Route>
          <Route exact path={"/menu"}>
            <MenuManager />
          </Route>
        </Switch>
      </div>
      <div className="right">
        <h2>current Order</h2>
      </div>
    </div>
  );
}
