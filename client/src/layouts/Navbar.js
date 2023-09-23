import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { logoutUser } from "../store/slices/UserSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // User Initial
  let initial =
    user.name.charAt(0) +
    user.name.substring(user.name.indexOf(" ") + 1).charAt(0);

  const logoutHandler = () => {
    logoutUser();
    Cookies.remove("userToken");
    navigate("/auth/login");
  };
  return (
    <>
      <nav
        className="navbar navbar-light bg-white shadow w-100"
        style={{ height: "2.5rem" }}
      >
        <DropdownButton
          size="sm"
          variant="secondary"
          title={initial}
          className="position-absolute"
          style={{ right: "10px" }}
        >
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
        </DropdownButton>
      </nav>
    </>
  );
};

export default Navbar;
