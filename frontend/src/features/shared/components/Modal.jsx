import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/ui";
import "./Modal.css";

export function Modal({ children }) {
  const dispatch = useDispatch();

  return (
    <div className="modal-overlay">
      <button onClick={() => dispatch(closeModal())}>x</button>
      <div className="modal">{children}</div>
    </div>
  );
}
