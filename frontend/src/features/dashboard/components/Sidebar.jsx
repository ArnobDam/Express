import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { SidebarLink } from "./SidebarLink";
import { PieChart } from "./PieChart";
import { LogoutButton } from "./LogoutButton";

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

const samplePieData = [
  {
    id: "java",
    label: "java",
    value: 78,
    color: "hsl(151, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 163,
    color: "hsl(50, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 562,
    color: "hsl(106, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 450,
    color: "hsl(30, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 577,
    color: "hsl(206, 70%, 50%)",
  },
];

export function Sidebar() {
  return (
    <div>
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
        <div style={{ height: "240px" }}>
          <PieChart data={samplePieData} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}