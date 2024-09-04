import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "./BannerSlider.css";

const BannerSlider = () => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://appsail-50022032157.development.catalystappsail.in/offers');
        const data = await response.json();
        const shuffledImages = data.sort(() => 0.5 - Math.random());
        setRandomImages(shuffledImages.slice(0, 3));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <Slider {...settings}>
          {randomImages.map((img) => (
            <div key={img.id}>
              <img src={img.imageName} alt={`Banner ${img.id}`} className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
