import { TbLogout } from "react-icons/tb";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import { SidebarLink } from "./SidebarLink";

const links = [
  {
    id: 1,
    path: "/",
    icon: <AiFillHome className="link-icon" />,
    label: "Home",
  },
  {
    id: 2,
    path: "/menu",
    icon: <MdFastfood className="link-icon" />,
    label: "Menu",
  },
  {
    id: 3,
    path: "/order",
    icon: <FaClipboardList className="link-icon" />,
    label: "Order",
  },
  {
    id: 4,
    path: "/history",
    icon: <RiChatHistoryFill className="link-icon" />,
    label: "History",
  },
  {
    id: 5,
    path: "/report",
    icon: <GoGraph className="link-icon" />,
    label: "Report",
  },
  {
    id: 6,
    path: "/settings",
    icon: <AiFillSetting className="link-icon" />,
    label: "Settings",
  },
];

export function Sidebar() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="brand-logo" style={{ width: "120px", height: "100px" }} />
      <div className="searchbar-container">
        <input
          className="searchbar"
          type="search"
          placeholder="What you want?"
        />
        <BiSearch className="search-icon" />
      </div>
      <h2 className="sidebar-dashboard">Dashboard</h2>
      <div className="sidebar-links-container">
        {links.map((link) => (
          <SidebarLink
            key={link.id}
            path={link.path}
            label={link.label}
            icon={link.icon}
          />
        ))}
        <div className="logout-button" onClick={() => dispatch(logout())}>
          <TbLogout className="logout-icon" />
          <div className="logout">Logout</div>
        </div>
      </div>
    </>
  );
}
