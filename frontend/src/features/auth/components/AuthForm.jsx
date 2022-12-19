import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../../store/session";
import "./AuthForm.css";
import backgroundImage from "./login.svg";

export function AuthForm({ children }) {
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
    <div className="AuthForm">
      <div className="left-column">
        <img
          className="auth-background-image"
          src={backgroundImage}
          alt="Background"
        />
      </div>
      <div className="right-column">
        <div className="auth-logo" />
        {children}
      </div>
    </div>
  );
}
