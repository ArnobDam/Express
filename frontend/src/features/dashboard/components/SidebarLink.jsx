import { NavLink } from "react-router-dom";

export function SidebarLink({ path, label, icon }) {
  return (
    <NavLink to={path} className="sidebar-link">
      <div>
        {icon}
        {label}
      </div>
    </NavLink>
  );
}
