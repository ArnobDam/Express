import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import "./App.css";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./features/shared/components/Routes";
import { SignupForm } from "./features/auth/components/SignupForm";
import { LoginForm } from "./features/auth/components/LoginForm";

import { logout } from "./store/session";
import { Dashboard } from "./features/dashboard/components/Dashboard";

export function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  //TODO: remove later

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
          <ProtectedRoute path="/">
            <Dashboard />
          </ProtectedRoute>
        </Switch>
      </div>
    )
  );
}
