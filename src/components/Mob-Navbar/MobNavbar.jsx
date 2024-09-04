import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MobNavbar.css";

const MobNavbar = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/mob-search");
  };

  return (
    <>
      <div className="MobNav">
        <div className="MobShoba">
          <img
            style={{ position: "relative", left: "50px" }}
            src="/shoba1.png"
            alt=""
            className="MobShoba1"
          />
          <br />
          <img src="/shoba2.png" alt="" className="MobShoba2" />
        </div>
        <div>
          <Link to="/mob-cart">
            <img className="Mobcart" src="/cart.png" alt="" />
          </Link>
        </div>
        <div>
          <Link to="/menu">
            <img className="Mobmenu" src="/menu.png" alt="" />
          </Link>
        </div>
      </div>
      <div className="MobSearch" onClick={handleSearchClick}>
        <div>
          <img className="searchIcon" src="/search.png" alt="" />
          <input
            className="MobSearchBar"
            type="search"
            placeholder="Search . . ."
          />
        </div>
      </div>
    </>
  );
};

export default MobNavbar;
