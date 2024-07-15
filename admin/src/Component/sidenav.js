import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css";
import gdswlogo from "../images/gdswlogo.png";

const navData = [
  {
    id: 0,
    text: "Product",
    link: "/dashboard",
    color: "#320473",
    fontSize: "16px",
    fontWeight: "550",
  },
  {
    id: 0,
    text: "Coupon",
    link: "/coupon",
    color: "#320473",
    fontSize: "16px",
    fontWeight: "550",
  }, {
    id: 0,
    text: "Orders",
    link: "/order",
    color: "#320473",
    fontSize: "16px",
    fontWeight: "550",
  },
  {
    id: 1,
    text: "Logout",
    link: "/",
    color: "#320473",
    fontSize: "16px",
    fontWeight: "550",
  },
];

const Sidenav1 = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.assign("/");
  };

  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>
      <div className="row ul_list">
        <li
          style={{
            width: "95%",
            borderBottom: "1px solid grey",
            display: open ? " flex" : "none",
          }}
        >
          <NavLink
            className="link_tag img"
            style={{ textDecoration: "none" }}
          >
            <img
              className="m-auto"
              style={{ borderRadius: "100px" }}
              width="60px"
              height="60px"
              src={gdswlogo}
              alt="logo"
            />
            <h6
              style={{
                display: open ? " flex" : " none",
                color: "#080780",
              }}
            >
              GDSWLLNESS
            </h6>
          </NavLink>
        </li>

        {navData.map((item) => {
          return (
            <li key={item.id}>
              {item.text === "Logout" ? (
                <NavLink
                  className={isActive(item.link) ? "sideitem active" : "sideitem"}
                  to={item.link}
                  onClick={handleLogout}
                >
                  <span
                    className={open ? "linkText " : "linkTextClosed active"}
                    style={{
                      color: item.color,
                      fontSize: item.fontSize,
                      fontWeight: item.fontWeight,
                    }}
                  >
                    {item.text}
                  </span>
                </NavLink>
              ) : (
                <NavLink
                  className={isActive(item.link) ? "sideitem active" : "sideitem"}
                  to={item.link}
                >
                  <span
                    className={open ? "linkText " : "linkTextClosed active"}
                    style={{
                      color: item.color,
                      fontSize: item.fontSize,
                      fontWeight: item.fontWeight,
                    }}
                  >
                    {item.text}
                  </span>
                </NavLink>
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenav1;
