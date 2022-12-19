import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signup, clearSessionErrors } from "../../../store/session";
import { AuthForm } from "./AuthForm";
import "./AuthForm.css";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <AuthForm>
      <form className="session-form" onSubmit={usernameSubmit}>
        <h2 className="auth-title">WELCOME</h2>
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

        <div className="errors">{errors?.username}</div>
        <div className="form-control">
          <input
            type="text"
            value={username}
            onChange={update("username")}
            placeholder="Username"
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

        <div className="errors">
          {password !== password2 && "Confirm Password field must match"}
        </div>
        <div className="form-control">
          <input
            type="password"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />
        </div>
        <div className="btn-group">
          <button
            className="btn"
            type="submit"
            disabled={
              !email || !username || !password || password !== password2
            }
          >
            Sign up
          </button>
        </div>
      </form>
    </AuthForm>
  );
}
