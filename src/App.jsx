import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PCNavbar from "./components/Pc-Navbar/PCNavbar";
import MobNavbar from "./components/Mob-Navbar/MobNavbar";
import MobMenu from "./components/Mob-Menu/MobMenu";
import BannerSlider from "./components/Home-Page/Slider/BannerSlider";
import ShopByCategory from "./components/Home-Page/ShopByCategory/ShopByCategory";
import SpecialOffer from "./components/Home-Page/SpecialOffer/SpecialOffer";
import AllCollection from "./components/Home-Page/AllCollection/AllCollection";
import LoadMore from "./components/Home-Page/AllCollection/LoadMore";
import WomensOffer from "./components/Home-Page/AllCollection/WomensOffer";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login&Register/Login";
import Register from "./components/Login&Register/Register";
import Cart from "./components/Cart/Cart";
import MobCart from "./components/Cart/MobCart";
import MobSearch from "./components/Mob-Navbar/MobSearch";
import ShopProductView from "./components/ShopProductView/ShopProductView";
import { RotatingLines } from "react-loader-spinner";
import SearchResults from "./components/SearchResults/SearchResults";
import Mens from "./components/Category/Mens";
import Womens from "./components/Category/Womens";
import Kids from "./components/Category/Kids";
import Offers from "./components/Category/Offers";
import Baby from "./components/Category/Baby";
import Other from "./components/Category/Other";
import Contact from "./components/Contact/Contact";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import OfferDetails from "./components/Category/OfferDetails";
import AdminLogin from "./components/AdminDashboard/AdminLogin";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (item) => {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      if (!isMobile) {
        openCart();
      }
    },
    [isMobile, openCart]
  );

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const renderNavbar = () =>
    isMobile ? <MobNavbar /> : <PCNavbar onCartClick={openCart} />;

  const CartComponent = isMobile ? MobCart : Cart;

  return (
    <div>
      {isLoading ? (
        <div className="loader-wrapper">
          <RotatingLines
            strokeColor="rgb(184, 0, 122)"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          {isCartOpen && (
            <CartComponent
              isOpen={isCartOpen}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              onClose={closeCart}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {renderNavbar()}
                  <BannerSlider />
                  <ShopByCategory />
                  <SpecialOffer />
                  <AllCollection addToCart={addToCart} isMobile={isMobile} />
                  <WomensOffer />
                  <Footer />
                </>
              }
            />
            <Route path="/menu" element={<MobMenu />} />
            <Route
              path="/load-more"
              element={
                <>
                  {renderNavbar()}
                  <LoadMore addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/mob-cart"
              element={
                <MobCart
                  isOpen={isCartOpen}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  onClose={closeCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  isOpen={isCartOpen}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  onClose={closeCart}
                />
              }
            />
            <Route path="/mob-search" element={<MobSearch />} />
            <Route
              path="/shop-product/:productId"
              element={
                <>
                  {renderNavbar()}
                  <ShopProductView addToCart={addToCart} />
                </>
              }
            />
            <Route
              path="/searchResult"
              element={
                <>
                  {renderNavbar()}
                  <SearchResults addToCart={addToCart} />
                </>
              }
            />
            <Route
              path="/mens"
              element={
                <>
                  {renderNavbar()}
                  <Mens addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/womens"
              element={
                <>
                  {renderNavbar()}
                  <Womens addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/kids"
              element={
                <>
                  {renderNavbar()}
                  <Kids addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/offers"
              element={
                <>
                  {renderNavbar()}
                  <Offers />
                </>
              }
            />
            <Route
              path="/baby"
              element={
                <>
                  {renderNavbar()}
                  <Baby addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/others"
              element={
                <>
                  {renderNavbar()}
                  <Other addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  {renderNavbar()}
                  <Contact />
                </>
              }
            />

            <Route
              path="/offer-details"
              element={
                <>
                  {renderNavbar()}
                  <OfferDetails addToCart={addToCart} isMobile={isMobile} />
                </>
              }
            />

            <Route
              path="/admin"
              element={
                <>
                  <AdminDashboard />
                </>
              }
            />

            <Route
              path="/admin-login"
              element={
                <>
                  <AdminLogin />
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
