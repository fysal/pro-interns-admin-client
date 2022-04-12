import React from "react";
import menuItems from "../../utils/menu.json";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminMenu = () => {
  return (
    <div className="c-sidebar">
      <div className="sidebar_nav">
        <div className="admin_brand">
          <NavLink to="/">
            <img src={logo} height="35" />
          </NavLink>
        </div>
        <div className="side_admin_menu hide-scrollbar ">
          <ul>
            {menuItems.map((menu, index) => (
              <li key={index}>
                <NavLink exact to={menu.path} className="c-sidebar-nav-item">
                  <span className="material-icons-outlined">{menu.icon}</span>
                  <div className="c-sidebar-nav-link">{menu.name}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="_ac_at bg-white">
        <span className="material-icons-outlined">logout</span>
        <div
          className="c-sidebar-nav-link pointer"
          onClick={() => {
            "";
          }}
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
