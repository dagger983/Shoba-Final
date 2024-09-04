import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PCNavbar.css";

const PCNavbar = ({ onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestionText, setSuggestionText] = useState("");
  const [username, setUsername] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://appsail-50022032157.development.catalystappsail.in/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }

    const timer = setTimeout(() => {
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const results = productsData.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.category.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setFilteredProducts(results);

        const suggestion =
          lowerCaseSearchTerm.split(" ").slice(0, -1).join(" ") + " balance";
        setSuggestionText(suggestion);
      } else {
        setFilteredProducts([]);
        setSuggestionText("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, productsData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm("");
    setFilteredProducts([]);
    setSuggestionText("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSearchAllClick = () => {
    navigate("/searchResult", { state: { searchTerm } });
    window.location.reload();
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="navbar-main">
      <div>
        <img
          style={{ position: "relative", left: "20px" }}
          src="/shoba1.png"
          alt="Logo 1"
        />
        <br />
        <img src="/shoba2.png" alt="Logo 2" />
      </div>
      <div className="navbar-sec2">
        <div className="navbar-sec2-1">
          <Link to="/">
            <p>Home</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/load-more">
            <p>Collections</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/Offers">
            <p>Offers</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/mens">
            <p>Mens</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/womens">
            <p>Womens</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/kids">
            <p>Kids</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/baby">
            <p>Baby</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/others">
            <p>Others</p>
          </Link>
          <div className="nav-style"></div>
          <Link to="/contact">
            <p>Contact</p>
          </Link>
        </div>
        <div className="searchbar-sec">
          <div>
            <img
              style={{ position: "relative", top: "10px" }}
              className="search"
              src="/search.png"
              alt="Search Icon"
            />
            <input
              className="searchbar"
              type="search"
              placeholder={suggestionText || "Search..."}
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search for products or categories"
              ref={inputRef}
            />
          </div>
          {filteredProducts.length > 0 && (
            <div className="search-suggestions">
              <div className="search-all-option" onClick={handleSearchAllClick}>
                Search all "{searchTerm}"
              </div>

              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop-product/${product.id}`}
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-details">
                    <h4>{highlightText(product.name, searchTerm)}</h4>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {filteredProducts.length === 0 && searchTerm !== "" && (
            <div className="search-suggestions no-results">
              No results found
            </div>
          )}
        </div>
      </div>
      <div className="navbar-sec3">
        <img src="/cart.png" alt="Cart Icon" onClick={onCartClick} />
        <img src="/profile.png" alt="Profile Icon" />
        {username ? (
          <p style={{ position: "relative", top: "5px" }} className="username">
            {username}
          </p>
        ) : (
          <Link to="/login">
            <p style={{ position: "relative", top: "5px" }} className="login">
              Login
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PCNavbar;
