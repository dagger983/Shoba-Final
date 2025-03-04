import React, { useState } from 'react';
import './MobCart.css';
import { FaTrash } from 'react-icons/fa';

const MobCart = ({ isOpen, cartItems, removeFromCart, updateQuantity, onClose }) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to proceed.');
      return;
    }
    setIsCheckoutModalOpen(true); // Open the modal
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Please enter a valid address.');
      return;
    }

    // Format the WhatsApp message
    const message = `Order Details:\n\nAddress: ${address}\n\nItems:\n${cartItems
      .map(
        (item) =>
          `${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n
          \n`
      )
      .join('\n')}\nTotal Amount: ₹${calculateTotal()}`;

    // Encode the message for the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp API link
    const whatsappLink = `https://wa.me/9442011620?text=${encodedMessage}`;

    // Open the link in a new tab
    window.open(whatsappLink, '_blank');

    // Reset the modal and close it
    setAddress('');
    setIsCheckoutModalOpen(false);
    onClose(); // Close the cart
  };

  return (
    <div className={`mobcart-container ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="mobcart-header">
        <h2>Your Cart - {cartItems.length} items</h2>
        <button onClick={onClose} aria-label="Close cart">
          &times;
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty 😢 <br /> Add Quality Products To Make it Yours . . . 😎 !
        </p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="mobcart-item">
            <img src={item.imageURL} alt={item.name} className="item-image" />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
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
            </div>
            <div className="item-price">₹{item.price}</div>
            <FaTrash
              style={{ color: 'red' }}
              className="remove-button"
              onClick={() => {
                if (window.confirm('Are you sure you want to remove this item from your cart?')) {
                  removeFromCart(item.id);
                }
              }}
              aria-label={`Remove ${item.name} from cart`}
            />
          </div>
        ))
      )}
      <div className="mobcart-total">
        <p>Total:</p>
        <p>₹{calculateTotal()}</p>
      </div>
      <div className="mobcart-checkout-container">
        <button className="checkout-btn" onClick={handleCheckout} aria-label="Proceed to checkout">
          Checkout
        </button>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Your Address</h2>
            <form onSubmit={handleAddressSubmit}>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsCheckoutModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Proceed to Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobCart;