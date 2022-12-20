import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";

export function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="logout-button" onClick={handleLogout} role="button">
      <TbLogout className="logout-icon" />
      <div className="logout">Logout</div>
    </div>
  );
}
