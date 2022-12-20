import { NavLink } from "react-router-dom";

//TODO:
export function AuthTabs() {
  return (
    <div className="auth-tabs">
      <NavLink className="tab" to="/login">
        Login
      </NavLink>
      <NavLink className="tab" to="/signup">
        Register
      </NavLink>
    </div>
  );
}
