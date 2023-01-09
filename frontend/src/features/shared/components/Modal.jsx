import { useRef } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/ui";
import useOnClickOutside from "use-onclickoutside";
import "./Modal.css";

export function Modal({ children, className = "" }) {
  const dispatch = useDispatch();

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch(closeModal());
  });

  return (
    <div className={`modal-overlay`}>
      {/* <button className="exit-modal" onClick={() => dispatch(closeModal())}>
        x
      </button> */}
      <div ref={ref} className={`modal ${className}`}>
        {children}
      </div>
    </div>
  );
}
