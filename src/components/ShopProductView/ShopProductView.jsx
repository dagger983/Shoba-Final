import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "./ShopProductView.css";
import Footer from "../Footer/Footer";
import ShippingModal from "./ShippingModal"; 

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
  
};
const ShopProductView = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://appsail-50022032157.development.catalystappsail.in/products/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();

        setProduct(data);

        const allProductsResponse = await fetch("https://appsail-50022032157.development.catalystappsail.in/products");
        const allProductsData = await allProductsResponse.json();
        const relatedProducts = allProductsData.filter(
          (item) => item.category === data.category && item.id !== productId
        );
        const shuffledProducts = shuffleArray(relatedProducts).slice(0, 4);
        setSimilarProducts(shuffledProducts);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <RotatingLines
          strokeColor="rgb(184, 0, 122)"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <div className="product-page-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        {product ? (
          <>
            <div className="shopProductView">
              <div className="shop-product-view">
                <div className="product-container">
                  <div className="product-details">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="shop-product-image"
                    />
                  </div>
                  <div className="product-info">
                    <div>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p>Price: ₹{product.price}</p>
                    </div>
                    <div className="action-buttons">
                      <button
                        onClick={() => addToCart(product)}
                        className="add-to-cart-button"
                      >
                        Add to Cart
                      </button>
                      <button className="buy-now-button" onClick={openModal}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {similarProducts.length > 0 && (
                <div className="similar-products-section">
                  <h2 className="similar-head">Similar Products</h2>
                  <div className="similar-products">
                    {similarProducts.map((similarProduct) => (
                      <div key={similarProduct.id} className="similar-product-card">
                        <img
                          src={similarProduct.image}
                          alt={similarProduct.name}
                          className="similar-product-image"
                          onClick={() => navigate(`/shop-product/${similarProduct.id}`)}
                        />
                        <div className="similar-product-info">
                          <h4
                            onClick={() => navigate(`/shop-product/${similarProduct.id}`)}
                          >
                            {similarProduct.name}
                          </h4>
                          <p>Price: ₹{similarProduct.price}</p>
                          <button
                            onClick={() => addToCart(similarProduct)}
                            className="add-to-cart-button"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Product not found.</p>
        )}
        <Footer />
      </div>
      <ShippingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ShopProductView;
