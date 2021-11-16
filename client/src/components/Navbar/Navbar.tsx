import React, { FC } from "react";
import "./styles.scss";

const Navbar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar--logo">CodeCreate</div>
      <div className="navbar--buttons">
        <button className="navbar--buttons__button">Code</button>
        <button className="navbar--buttons__button">Create</button>
      </div>
    </div>
  );
};

export default Navbar;
