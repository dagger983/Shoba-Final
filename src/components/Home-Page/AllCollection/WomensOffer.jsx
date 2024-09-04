import React from "react";
import "./LoadMore.css";
import { Link } from "react-router-dom";
const WomensOffer = () => {
  return (
    <>
      <div className="womensoff">
        <div>
          <img src="./specialofferDolli.webp" alt="" /> 
        </div>
        <div className="womans-sec">
            <p>Trending item <br /> Women's latest fashion sale</p>
            <Link to="/womens">
            <button>Shop Now</button>
            </Link>
         
          </div>
      </div>
    </>
  );
};

export default WomensOffer;
