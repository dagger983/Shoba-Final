import React, { useState, useEffect } from "react";
import "./MainContent.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL =
  "https://appsail-50022032157.development.catalystappsail.in/products";
const SUBCATEGORIES_URL =
  "https://appsail-50022032157.development.catalystappsail.in/subcategories";

const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    imageURL: "",
    description: "",
    stock: "",
    offer: "",
  });
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData(API_URL, setProducts);
    fetchData(SUBCATEGORIES_URL, (data) => {
      const categoriesSet = new Set(data.map((item) => item.category));
      setCategories(Array.from(categoriesSet));
      setSubcategories(data);
    });
  }, []);

  const fetchData = async (url, callback, headers = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      callback(data);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    if (selectedCategory === "Offer") {
      setSelectedOffer("");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `${"https://shoba-backend.onrender.com/products"}/${editingProductId}`
      : "https://shoba-backend.onrender.com/products";

    const updatedFormData = {
      ...formData,
      offer: selectedOffer,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error occurred");
      }

      alert(
        editingProductId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      resetForm();
      fetchData(API_URL, setProducts);
    } catch (error) {
      setError(`Failed to add/edit product. ${error.message}`);
      console.error("Submit Error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${"https://shoba-backend.onrender.com/products"}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError("Error deleting product. Please try again.");
      console.error("Delete Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      imageURL: product.imageURL,
      description: product.description,
      stock: product.stock,
      offer: product.offer || "",
    });
    setSelectedCategory(product.category);
    setSelectedOffer(product.offer || "");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      imageURL: "",
      description: "",
      stock: "",
      offer: "",
    });
    setSelectedCategory("");
    setSelectedOffer("");
    setEditingProductId(null);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="admin-main">
      <h2 style={{ textAlign: "center", marginTop: "30px", fontSize: "52px" }}>
        Admin Dashboard
      </h2>
      <div className="container">
        <div>
          <h2 className="admin-header">
            {editingProductId ? "Edit Product" : "Add New Product"}
          </h2>
          {error && <p className="error">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <select
                className="select"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {formData.category === "Offer" && (
              <div className="form-group">
                <select
                  className="select"
                  name="offer"
                  value={selectedOffer}
                  onChange={(e) => setSelectedOffer(e.target.value)}
                  required
                >
                  <option value="">Select Offer</option>
                  {subcategories
                    .filter((subcategory) => subcategory.category === "Offer")
                    .map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.subcategory} - {subcategory.imageURL}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {formData.category !== "Offer" && (
              <div className="form-group">
                <select
                  className="select"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  disabled={!selectedCategory}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter(
                      (subcategory) => subcategory.category === selectedCategory
                    )
                    .map((subcategory) => (
                      <option
                        key={subcategory.id}
                        value={subcategory.subcategory}
                      >
                        {subcategory.subcategory}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="form-group">
              <input
                className="input"
                type="number"
                min={0}
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input"
                type="text"
                name="imageURL"
                placeholder="Image URL"
                value={formData.imageURL}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                className="textarea"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input"
                type="number"
                min={0}
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <br />
            <button
              className="submit-button"
              type="submit"
              disabled={formLoading}
            >
              {formLoading
                ? "Processing..."
                : editingProductId
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="admin-header">Manage Products</h2>
          <div>
            <input
              type="text"
              className="admin-search-bar"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <br />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="product-list">
              {filteredProducts.map((product) => (
                <li className="product-item" key={product.id}>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="admin-product-image"
                    onClick={() => window.open(`/shop-product/${product.id}`, '_blank')}
                  />
                  {product.name} - ₹ {product.price}
                  <div className="actions">
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEdit(product)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
