import React from "react";
import { Link } from "react-router-dom";
import "./MobMenu.css";

const MobMenu = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const username = user ? user.username : null;

  console.log("Username from localStorage:", username);

  return (
    <div className="MobMenu">
      <div className="exit-icon">
        <Link to="/">
          <img src="./exit.png" alt="Exit" />
        </Link>
      </div>
      {username ? (
        <div className="MobMenu1-2">
          <img src="./profile.png" alt="Profile" />
          <h4 className="login-menu">{username}</h4>
        </div>
      ) : (
        <Link to="/login">
          <div className="MobMenu1-2">
            <img src="./profile.png" alt="Profile" />
            <h4 className="login-menu">Login</h4>
          </div>
        </Link>
      )}
      <div>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/load-more">
          <p>All Products</p>
        </Link>
        <Link to="/HomeFurnitures">
          {" "}
          <p>Home Furnitures</p>
        </Link>
        <Link to="/mens">
          <p>Office Furnitures</p>
        </Link>
        <Link to="/womens">
          <p>Kids Furnitures</p>
        </Link>
        <Link to="/kids">
          {" "}
          <p>Home Appliances</p>
        </Link>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
      </div>
    </div>
  );
};

export default MobMenu;
