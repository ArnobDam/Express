import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { SidebarLink } from "./SidebarLink";
import { PieChart } from "./PieChart";
import { LogoutButton } from "./LogoutButton";
import { formatPrice } from "../../../utils/formatPrice";
import { useSelector } from "react-redux";
import { selectTotalWithTax } from "../../../store/orders";
import { useEffect, useState } from "react";

const links = [
  // {
  //   id: 1,
  //   path: "/dashboard",
  //   icon: <AiFillHome className="link-icon" />,
  //   label: "Home",
  // },
  {
    id: 2,
    path: "/menu",
    icon: <MdFastfood className="link-icon" />,
    label: "Menu",
  },
  {
    id: 4,
    path: "/history",
    icon: <RiChatHistoryFill className="link-icon" />,
    label: "History",
  },
  // {
  //   id: 5,
  //   path: "/report",
  //   icon: <GoGraph className="link-icon" />,
  //   label: "Report",
  // },
  {
    id: 6,
    path: "/settings",
    icon: <AiFillSetting className="link-icon" />,
    label: "Product Management",
  },
  {
    id: 3,
    path: "/about",
    icon: <FaClipboardList className="link-icon" />,
    label: "About",
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
  let totalWithTax = useSelector(selectTotalWithTax);

  const [priceLeftMargin, setPriceLeftMargin] = useState("27%");
  const currentUser = useSelector((state) => state.session.user);
  const PieChartPrice = () => {
    if (totalWithTax === 0) {
      return "";
    } else {
      return formatPrice(totalWithTax);
    }
  };

  useEffect(() => {
    if (Math.floor(totalWithTax).toString().length === 3) {
      setPriceLeftMargin("30%");
    } else if (Math.floor(totalWithTax).toString().length === 4) {
      setPriceLeftMargin("27%");
    } else if (Math.floor(totalWithTax).toString().length === 5) {
      setPriceLeftMargin("24%");
    } else {
      setPriceLeftMargin("19%");
    }
  }, [PieChartPrice]);

  return (
    <div>
      <div className="brand-logo" style={{ width: "120px", height: "100px" }} />
      <div className="searchbar-container" style={{ visibility: "hidden" }}>
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
        <div style={{ height: "240px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: priceLeftMargin,
              fontSize: 26,
              opacity: 0.4,
            }}
          >
            {PieChartPrice()}
          </div>
          <PieChart data={samplePieData} />
        </div>
        <p
          style={{
            paddingLeft: "12px",
            color: "var(--dark-grey)",
            fontSize: 14,
          }}
        >
          Logged in as:{" "}
          <span style={{ fontWeight: 600, color: "var(--bg-primary)" }}>
            {currentUser.username}
          </span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
