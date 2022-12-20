import { NavLink } from "react-router-dom";

export function SidebarLink({ path, label, icon }) {
  return (
    <NavLink to={path}>
      <div className="sidebar-link">
        {icon}
        {label}
      </div>
    </NavLink>
  );
}
