import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link if using React Router
import './Cart.css';

const Cart = ({ isOpen, cartItems, removeFromCart, updateQuantity, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveClick = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      removeFromCart(itemId);
    }
  };

  const getCartSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal.toFixed(2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const { username = "N/A", mobile = "N/A" } = userData;
  
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPayment = subtotal;
  
    const productsDetails = cartItems.map(item => 
      `Product: ${item.name}\nQuantity: ${item.quantity}\nPrice: ₹${item.price}\nURL: ${window.location.origin}/product/${item.id}\n\n`
    ).join("");
  
    const message = encodeURIComponent(
      `Shipping Address:\nAddress: ${address}\nCity: ${city}\nState: ${state}\nPin Code: ${zip}\n\nUser Details:\nUsername: ${username}\nMobile: ${mobile}\n\nCart Items:\n${productsDetails}\nTotal Payment: ₹${totalPayment}`
    );
  
    const whatsappLink = `https://wa.me/6384311620?text=${message}`;
    window.open(whatsappLink, "_blank");
    setModalOpen(false);
  };
  

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`} role="dialog" aria-labelledby="cart-title" aria-modal="true">
      <div className="cart-content">
        <button className="close-button" onClick={onClose} aria-label="Close cart">
          ✕
        </button>
        <h2 id="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p style={{fontWeight:"400",marginTop:"10px",textAlign:"left"}}>Your cart is empty 😢 <br /> Add a Quality Products To Make it Yours . . .  😎 !</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item" role="listitem">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="item-image" />
              </Link>
              <div className="item-details">
                <p style={{fontWeight:"400",marginTop:"10px"}}>{item.name}</p>
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <p style={{fontWeight:"400",marginTop:"10px"}}>Price: ₹{item.price}</p>
              </div>
              <FaTrash style={{color:'red'}} className="remove-button"
                onClick={() => handleRemoveClick(item.id)}
                aria-label={`Remove ${item.name} from cart`} />
            </div>
          ))
        )}
        <div className="cart-summary">
          <p>Subtotal: ₹{getCartSummary()}</p>
          <button 
            className="checkout-button" 
            aria-label="Proceed to checkout"
            onClick={() => setModalOpen(true)}
          >
            Checkout
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setModalOpen(false)}>X</button>
            <h2>Enter Shipping Address</h2>
            <form onSubmit={handleSubmit} style={{marginTop: "30px"}}>
              <label>
                <input
                  placeholder="Door No and Street"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  placeholder="Town /City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  placeholder="State"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  placeholder="Pin Code"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </label>
              <button className="submitBTN" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
