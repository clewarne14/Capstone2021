import React, { FC } from "react";
import Button from "../Button/Button";
import "./styles.scss";

const Navbar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar--logo">CodeCreate</div>
      <div className="navbar--buttons">
        <Button onClick={() => alert("Clicked")}>Code</Button>
        <Button onClick={() => alert("Clicked")}>Create</Button>
      </div>
    </div>
  );
};

export default Navbar;
