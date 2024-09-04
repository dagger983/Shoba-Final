import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./ShopByCategory.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RoundSlider = () => {
  const navigate = useNavigate();

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow arrow-next" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow arrow-prev" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const categories = [
    { id: 1, name: "Womens", img: "/women.jpg", path: "/womens" },
    { id: 2, name: "Kids", img: "/kids.jpg", path: "/kids" },
    { id: 3, name: "Mens", img: "/mens.webp", path: "/mens" },
    { id: 4, name: "Babys", img: "/baby.jpg", path: "/baby" },
    { id: 5, name: "Others", img: "/others.jpg", path: "/others" },
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="round-slider">
      <h2>Shop by Category</h2>
      <div>
        <Slider {...settings}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="slider-item"
              onClick={() => handleCategoryClick(category.path)}
            >
              <img
                src={category.img}
                alt={category.name}
                className="round-slider-image"
              />
              <p>{category.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RoundSlider;
