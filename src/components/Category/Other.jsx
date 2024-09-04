import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "./Category.css";
import Footer from "../Footer/Footer";

const Others = ({ addToCart, isMobile }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://appsail-50022032157.development.catalystappsail.in/products");
        const data = await response.json();
        const mensProducts = data.filter(product => product.category === "Kids");
        setProducts(mensProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let sortedProducts = [...products];

    switch (sortOrder) {
      case "price-low-to-high":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high-to-low":
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  }, [products, sortOrder]);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart({ ...product, quantity: 1 });
      alert("Product added to cart");
    },
    [addToCart]
  );

  return (
    <>
      <br />
      <br />
      <br />
      <div className="design-shoba"></div>
      <div className={`collection-container ${isMobile ? "mobile" : ""}`}>
        <h2 className="collection-title">Others Collection</h2>
        <div className="filters-container">
          <select
            className="sort-select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className={`product-grid ${isMobile ? "mobile-grid" : ""}`}>
        {loading ? (
          <div className="spinner-container">
            <RotatingLines
              strokeColor="rgb(184, 0, 122)"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/shop-product/${product.id}`}>
                <div className="card-img-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3 className="card-title">{product.name}</h3>
                <p className="card-price">₹{product.price}</p>
              </Link>
              <button
                className="card-button"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))
        )}
      </div>
      <div className="design-shoba"></div>
      <Footer />
    </>
  );
};

export default Others;
