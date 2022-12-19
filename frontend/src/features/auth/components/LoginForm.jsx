import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../../store/session";
import "./AuthForm.css";
import { NavLink } from "react-router-dom";
import { AuthForm } from "./AuthForm";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <AuthForm>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">WELCOME BACK</h2>
        <div className="auth-tabs">
          <NavLink className="tab" to="/login">
            Login
          </NavLink>
          <NavLink className="tab" to="/signup">
            Register
          </NavLink>
        </div>

        <div className="errors">{errors?.email}</div>
        <div className="form-control">
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <div className="form-control">
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </div>
        {/* <button className="btn" type="submit" disabled={!email || !password}> */}
        <div className="btn-group">
          <button className="btn" type="submit">
          Log in
        </button>
        </div>
      </form>
    </AuthForm>
  );
}
