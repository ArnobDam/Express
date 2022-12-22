import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/ui";
import "./Modal.css";

export function Modal({ children, className = "" }) {
  const dispatch = useDispatch();

  return (
    <div className={`modal-overlay`}>
      <button className="exit-modal"onClick={() => dispatch(closeModal())}>x</button>
      <div className={`modal ${className}`}>{children}</div>
    </div>
  );
}
