import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchResults.css";
import MobFilter from "./MobFilter";
import Footer from "../Footer/Footer"
const SearchResults = ({ addToCart }) => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://appsail-50022032157.development.catalystappsail.in/products`);
        const data = await response.json();
        setProducts(data);

        const prices = data.map((product) => product.price);
        const maxProductPrice = Math.max(...prices);
        const minProductPrice = Math.min(...prices);

        setMaxPrice(maxProductPrice);
        setMinPrice(minProductPrice);
        setPriceRange([minProductPrice, maxProductPrice]);

        applyFilters(data);   
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = (productList = products) => {
    let updatedProducts = productList;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortOrder === "price-low-to-high") {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high-to-low") {
      updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [categories, priceRange, sortOrder]);

  const handleCategoryChange = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const handlePriceRangeChange = (selectedPriceRange) => {
    setPriceRange(selectedPriceRange);
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert("Product added to cart");
  };

  const handleOpenFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  return (
    <>
    <br />
      <br />
      <div className="design-shoba"></div>
      <div className="searchResult">
        <h2>Search Results for "{searchTerm}"</h2>
      </div>
      <div className="searchResult1">
        <div className="searchResult-2">
          <div className="searchResult-3">
            <p>Category</p>
            {["Mens", "Womens", "Kids", "Baby", "Others"].map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  name={category}
                  onChange={(e) => {
                    const { name, checked } = e.target;
                    setCategories((prev) =>
                      checked ? [...prev, name] : prev.filter((cat) => cat !== name)
                    );
                  }}
                />
                <label htmlFor={category}>{category}</label>
                <br />
              </div>
            ))}
            <br />
            <hr />
            <br />
            <div>
              <p>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
              <input
                type="range"
                name="priceRange"
                id="priceRange"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="searchResult0">
            <p style={{ marginTop: "20px", marginRight: "30px" }}>
              {filteredProducts.length} items found
            </p>
            <div>
              <select
                className="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-low-to-high">Price (Low to High)</option>
                <option value="price-high-to-low">Price (High to Low)</option>
              </select>
              <button className="filter-btn" onClick={handleOpenFilter}>Filter</button>
            </div>
          </div>
          <div className="searchResultList">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="productItem">
                  <Link to={`/shop-product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                    <p>Price : ₹{product.price}</p>
                  </Link>
                  <button
                    className="searchResultAddtoCart"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
      {showFilter && (
        <MobFilter
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApplyFilters={(selectedCategories, selectedPriceRange) => {
            handleCategoryChange(selectedCategories);
            handlePriceRangeChange(selectedPriceRange);
            applyFilters();
          }}
          onClose={handleCloseFilter}
        />
      )}
      <br />
      <br />
      <div className="design-shoba"></div>
      <Footer/>
    </>
  );
};

export default SearchResults;
