import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import "./App.css";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./features/shared/components/Routes";
import { SignupForm } from "./features/auth/components/SignupForm";
import { LoginForm } from "./features/auth/components/LoginForm";

import { logout } from "./store/session";

export function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  //TODO: remove later
  const currentUser = useSelector((state) => state.session);

  return (
    loaded && (
      <div className="App">
        <Switch>
          <AuthRoute path="/login">
            <LoginForm />
          </AuthRoute>
          <AuthRoute path="/signup">
            <SignupForm />
          </AuthRoute>
          <ProtectedRoute>
            <div>
              <h1>Dashboard</h1>
              <h3>Welcome back {currentUser?.user?.username}</h3>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
          </ProtectedRoute>
        </Switch>
      </div>
    )
  );
}
