import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./features/shared/components/Routes";
import { SignupForm } from "./features/auth/components/SignupForm";
import { LoginForm } from "./features/auth/components/LoginForm";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import "./App.css";

export function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

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
