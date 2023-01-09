import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../../store/session";
import "./AuthForm.css";
import { NavLink } from "react-router-dom";
import { AuthForm } from "./AuthForm";
import { SlLock } from "react-icons/sl";
import { HiOutlineUser } from "react-icons/hi";

const initialFormState = {
  email: "",
  password: "",
};

export function LoginForm() {
  const [loginFormData, setLoginFormData] = useState(initialFormState);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    setLoginFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      email: loginFormData.email,
      password: loginFormData.password,
    };
    dispatch(login(credentials));
  };

  const handleDemoLogin = () => {
    const credentials = {
      email: loginFormData.email,
      password: loginFormData.password,
    };
    if (credentials.email && credentials.password) {
      dispatch(login(credentials));
    }
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

        <div className="form-control">
          <div className="icon-prepend">
            <HiOutlineUser />
          </div>
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-control">
          <div className="icon-prepend">
            <SlLock />
          </div>
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="errors auth">{errors?.email}</div>
        <div className="btn-group">
          <button
            className="btn"
            type="submit"
            disabled={!loginFormData.email || !loginFormData.password}
          >
            Log in
          </button>
          <button
            className="btn"
            type="submit"
            style={{
              marginLeft: "12px",
              backgroundColor: "transparent",
              border: "2px solid var(--bg-primary)",
              color: "var(--bg-primary)",
            }}
            onClick={() => {
              setLoginFormData({
                email: "admin@express.com",
                password: "ExpressPOS",
              });
              handleDemoLogin();
            }}
          >
            Demo User
          </button>
        </div>
      </form>
    </AuthForm>
  );
}
