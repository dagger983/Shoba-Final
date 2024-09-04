import React, { useState } from 'react';
import './MobFilter.css';

const MobFilter = ({ categories, minPrice, maxPrice, onApplyFilters, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((category) => category !== name)
    );
  };

  const handlePriceRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], value]);
  };

  const handleConfirm = () => {
    onApplyFilters(selectedCategories, priceRange);
    onClose();
  };

  return (
    <div className="mobFilter">
      <h2>Filter</h2>
      <div className="mobFilter-section">
        <br />
        <hr />
        <br />
        <p>Category</p>
        {["Mens", "Womens", "Kids", "Baby", "Others"].map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              name={category}
              onChange={handleCategoryChange}
            />
            <label htmlFor={category}>{category}</label>
            <br />
          </div>
        ))}
      </div>
       <hr />
       <br />
      <div className="mobFilter-section">
        <p>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={handlePriceRangeChange}
        />
      </div>
      <button className='mobFilter-section-confirm-button' onClick={handleConfirm}>Confirm</button>
      <button className='mobFilter-section-close-button' onClick={onClose}>Close</button>
    </div>
  );
};

export default MobFilter;
