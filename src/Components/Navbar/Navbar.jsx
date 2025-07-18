import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Context/UserContext";
import logo from "/images/logo.png";
import cart_icon from "/images/cart_icon.png";
import { FiMenu, FiX } from "react-icons/fi";
import { Heart } from "lucide-react";

function Navbar() {
  const [focus, setFocus] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    getTotalCartItems,
    wishlistItems,
    setCartItems,
    setWishlistItems,
  } = useContext(ShopContext);
  const { user, setUser, isAdmin } = useContext(UserContext);

  const navItems = ["shop", "men", "women", "kids"];

  return (
    <header className="w-full shadow-sm bg-white z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="logo" className="w-8 sm:w-10" />
          <p className="text-[#171717] text-[24px] sm:text-[32px] font-semibold">SHOPPER</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-10 text-[#171717] text-lg font-medium">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setFocus(item)}
              className="list-none flex flex-col items-center gap-1 cursor-pointer"
            >
              <Link
                to={item === "shop" ? "/" : `/${item}`}
                className="no-underline text-inherit"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
              {focus === item && (
                <hr className="w-3/4 h-[3px] bg-[#ff4141] rounded-lg border-none" />
              )}
            </li>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div
          className="sm:hidden text-3xl text-[#171717] cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-6">
          {isAdmin && (
            <Link to="/admin">
              <button className="px-5 py-2 rounded-full text-white bg-[#ff4141] hover:bg-[#e63a3a] font-medium transition">
                Admin Dashboard
              </button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden md:inline-block">
                Hello, <span className="font-semibold">{user.name || user.email}</span>
              </span>
              <button
                onClick={() => {
                  setUser(null);
                  setCartItems({});
                  setWishlistItems([]);
                }}
                className="px-6 py-2 border border-[#7a7a7a] rounded-full text-[#171717] text-base font-medium hover:bg-[#f5f5f5] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 border border-[#7a7a7a] rounded-full text-[#171717] text-base font-medium hover:bg-[#f5f5f5] transition">
                Login
              </button>
            </Link>
          )}

          {/* Wishlist Icon */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Link to="/wishlist">
              <Heart className="w-6 h-6 text-[#ff4141]" />
            </Link>
            {wishlistItems.length > 0 && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4141] text-white text-xs rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Link to="/cart">
              <img src={cart_icon} alt="cart" className="w-6 h-6" />
            </Link>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4141] text-white text-xs rounded-full flex items-center justify-center">
              {getTotalCartItems()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white px-4 py-4 shadow-md flex flex-col gap-4">
          {navItems.map((item) => (
            <div key={item} className="flex flex-col items-start gap-1">
              <Link
                to={item === "shop" ? "/" : `/${item}`}
                onClick={() => {
                  setFocus(item);
                  setMobileMenuOpen(false);
                }}
                className="text-[#171717] text-base font-medium"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
              {focus === item && (
                <div className="w-[60px] h-[3px] rounded-md bg-[#ff4141]" />
              )}
            </div>
          ))}

          {isAdmin && (
            <Link to="/admin">
              <button className="w-full py-2 bg-[#ff4141] text-white rounded-md text-center font-medium">
                Admin Dashboard
              </button>
            </Link>
          )}

          {/* Mobile Login, Wishlist & Cart */}
          <div className="flex items-center justify-between pt-4">
            {user ? (
              <button
                onClick={() => {
                  setUser(null);
                  setCartItems({});
                  setWishlistItems([]);
                  setMobileMenuOpen(false);
                }}
                className="w-[110px] h-[45px] border border-[#7a7a7a] rounded-full text-[#171717] text-sm font-medium hover:bg-[#f5f5f5] transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="w-[110px] h-[45px] border border-[#7a7a7a] rounded-full text-[#171717] text-sm font-medium hover:bg-[#f5f5f5] transition">
                  Login
                </button>
              </Link>
            )}

            <div className="flex items-center gap-4">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 text-[#ff4141]" />
                </Link>
                {wishlistItems.length > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4141] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </div>
                )}
              </div>

              <div className="relative w-7 h-7 flex items-center justify-center">
                <Link to="/cart">
                  <img src={cart_icon} alt="cart" className="w-6 h-6" />
                </Link>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4141] text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalCartItems()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
