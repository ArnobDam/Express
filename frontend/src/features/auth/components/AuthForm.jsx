import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSessionErrors } from "../../../store/session";
// import backgroundImage from "./login.svg";
import backgroundImage from "./user-lock.png";
import "./AuthForm.css";

export function AuthForm({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

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
        {/* <div className="auth-logo" /> */}
        {children}
      </div>
    </div>
  );
}
