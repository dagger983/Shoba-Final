import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './MobSearch.css';

const MobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const productsData = await response.json();

        if (searchTerm) {
          const results = productsData.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(results);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearchAllClick = () => {
    navigate('/searchResult', { state: { searchTerm } }); 
  };

  return (
    <div className="mob-search">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {searchTerm && filteredProducts.length > 0 && (
        <>
          <div className="product-list">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/shop-product/${product.id}`}
                className="product-item"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <button className="search-all" onClick={handleSearchAllClick}>
            Search all "{searchTerm}"
          </button>
        </>
      )}

      {searchTerm && filteredProducts.length === 0 && (
        <>
          <div className="no-results">No results found for "{searchTerm}"</div>
          <button className="search-all" onClick={handleSearchAllClick}>
            Search all "{searchTerm}"
          </button>
        </>
      )}
    </div>
  );
};

export default MobSearch;
