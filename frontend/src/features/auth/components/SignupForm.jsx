import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signup, clearSessionErrors } from "../../../store/session";
import { AuthForm } from "./AuthForm";
import "./AuthForm.css";

const initialFormState = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

export function SignupForm() {
  const [signupFormData, setSignupFormData] = useState(initialFormState);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    setSignupFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: signupFormData.email,
      username: signupFormData.username,
      password: signupFormData.password,
    };

    dispatch(signup(user));
  };

  const isEmpty = (values) => {
    return Object.values(values).some((value) => !value);
  };

  return (
    <AuthForm>
      <form className="session-form" onSubmit={handleSubmit} noValidate>
        <h2 className="auth-title">WELCOME</h2>
        <div className="auth-tabs">
          {/* TODO: */}
          <NavLink className="tab" to="/login">
            Login
          </NavLink>
          <NavLink className="tab" to="/signup">
            Register
          </NavLink>
        </div>
        <div className="form-control">
          <input
            type="email"
            name="email"
            value={signupFormData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="errors">{errors?.email}</div>

        <div className="form-control">
          <input
            type="text"
            name="username"
            value={signupFormData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="errors">{errors?.username}</div>

        <div className="form-control">
          <input
            type="password"
            name="password"
            value={signupFormData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="errors">{errors?.password}</div>

        <div className="form-control">
          <input
            type="password"
            name="password2"
            value={signupFormData.password2}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <div className="errors">
          {signupFormData.password !== signupFormData.password2 &&
            "Confirm Password field must match"}
        </div>

        <div className="btn-group">
          <button
            className="btn"
            type="submit"
            disabled={isEmpty(signupFormData)}
          >
            Sign up
          </button>
        </div>
      </form>
    </AuthForm>
  );
}
