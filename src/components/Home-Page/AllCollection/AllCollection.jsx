import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllCollection.css";

const AllCollection = ({ addToCart, isMobile }) => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    fetch("https://appsail-50022032157.development.catalystappsail.in/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setSortedProducts(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      switch (selectedSort) {
        case "price-low-to-high":
          return a.price - b.price;
        case "price-high-to-low":
          return b.price - a.price;
        default:
          return 0;
      }
    });
    setSortedProducts(sorted);
  }, [selectedSort, products]);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value); 
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert("Product added to cart");
  };

  const displayedProducts = sortedProducts.slice(0, 12);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <>
      <div className="all-collection">
        <h2>All Collection</h2>
        <select value={selectedSort} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price-low-to-high">Price (Low to High)</option>
          <option value="price-high-to-low">Price (High to Low)</option>
        </select>
      </div>

      <div className="product-grid">
        {displayedProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/shop-product/${product.id}`}>
                <div className="img-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))
        )}
      </div>
      <div className="LoadMoreBtn">
        <Link to="/load-more">
          <button>Load More</button>
        </Link>
      </div>
    </>
  );
};

export default AllCollection;
