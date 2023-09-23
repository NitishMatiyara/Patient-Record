import React from "react";

const Footer = () => {
  return (
    <footer
      className="sticky-footer bg-white"
      style={{
        height: "1.6rem",
        bottom: "0",
        position: "fixed",
        zIndex: -1,
        width: "100vw",
      }}
    >
      <div className="copyright bg-light text-center text-secondary my-auto">
        Created by <span style={{ color: "green" }}>Nitish</span> | &copy; 2022
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
