import React, { useState } from "react";

const ShippingModal = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const { username = "N/A", mobile = "N/A" } = userData;

    const message = encodeURIComponent(
      `Shipping Address:\nAddress: ${address}\nCity: ${city}\nState: ${state}\nPin Code: ${zip}\n\nUser Details:\nUsername: ${username}\nMobile: ${mobile}`
    );

    const whatsappLink = `https://wa.me/6384311620?text=${message}`;
    window.open(whatsappLink, "_blank");
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>X</button>
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
  ) : null;
};

export default ShippingModal;
