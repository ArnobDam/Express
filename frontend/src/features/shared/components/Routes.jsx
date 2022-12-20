import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function AuthRoute({ children, ...rest }) {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function ProtectedRoute({ children, ...rest }) {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
