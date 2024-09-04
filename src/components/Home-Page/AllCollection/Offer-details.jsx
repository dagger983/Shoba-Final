import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "./LoadMore.css";
import Footer from "../../Footer/Footer";

const OfferDetails = ({ addToCart, isMobile }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch("https://appsail-50022032157.development.catalystappsail.in/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products.filter((product) =>
      category ? product.category === category : true
    );

    switch (sortOrder) {
      case "price-low-to-high":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "price-high-to-low":
        return filteredProducts.sort((a, b) => b.price - a.price);
      default:
        return filteredProducts;
    }
  }, [products, category, sortOrder]);

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
        <h2 className="collection-title">Offer Details</h2>
       
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

export default OfferDetails;
