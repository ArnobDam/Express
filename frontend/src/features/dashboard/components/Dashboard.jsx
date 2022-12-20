import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { BiSearch } from "react-icons/bi";

{
  /* <h1>Dashboard</h1>
      <h3>Welcome back {currentUser?.user?.username}</h3>
      <button onClick={() => dispatch(logout())}>Logout</button> */
}

export function Dashboard() {
  const currentUser = useSelector((state) => state.session);
  const dispatch = useDispatch();

  return (
    <div className="Dashboard">
      <div className="left">
        <div
          className="brand-logo"
          style={{ width: "120px", height: "100px" }}
        />
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
          <div className="sidebar-link">
            <AiFillHome className="link-icon" />
            Home
          </div>
          <div className="sidebar-link">
            <MdFastfood className="link-icon" />
            Menu
          </div>
          <div className="sidebar-link">
            <FaClipboardList className="link-icon" />
            Order
          </div>
          <div className="sidebar-link">
            <RiChatHistoryFill className="link-icon" />
            History
          </div>
          <div className="sidebar-link">
            <GoGraph className="link-icon" />
            Report
          </div>
          <div className="sidebar-link">
            <AiFillSetting className="link-icon" />
            Settings
          </div>
          <div className="logout-button" onClick={() => dispatch(logout())}>
            <TbLogout className="logout-icon" />
            <div className="logout">Logout</div>
          </div>
        </div>
      </div>
      <div className="center">
        <h2>Choose category</h2>
        <div>
          <p>cat1</p>
          <p>cat2</p>
        </div>
      </div>
      <div className="right">
        <h2>current Order</h2>
      </div>
    </div>
  );
}
