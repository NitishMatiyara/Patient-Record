import React from "react";

const Footer = () => {
  return (
    <footer
      className="sticky-footer"
      style={{
        backgroundColor: "transparent",
        height: "1.6rem",
        bottom: "0",
        position: "fixed",
        zIndex: -3,
        width: "100vw",
      }}
    >
      <div className="copyright text-center text-secondary my-auto">
        Created by <span style={{ color: "green" }}>Nitish</span> | &copy; 2022
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
