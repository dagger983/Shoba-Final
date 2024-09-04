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
          <div className="MobMenu1-2" >
            <img src="./profile.png" alt="Profile" />
            <h4 className="login-menu">Login</h4>
          </div>
        </Link>
      )}
      <div>
      <Link to="/"><p>Home</p></Link>
       <Link to="/load-more"><p>Collections</p></Link> 
       <Link to="/"> <p>Offers</p></Link>
        <p>Mens</p>
        <p>Womens</p>
        <p>Kids</p>
        <p>Baby</p>
        <p>Others</p>
        <p>Contact</p>
      </div>
    </div>
  );
};

export default MobMenu;
