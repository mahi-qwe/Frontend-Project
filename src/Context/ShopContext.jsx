import React, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : {};
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [recentlyVisited, setRecentlyVisited] = useState([]); // ✅ Start empty

  // ✅ Load user-specific recentlyVisited when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`recentlyVisited_${user.email}`);
      setRecentlyVisited(stored ? JSON.parse(stored) : []);
    } else {
      setRecentlyVisited([]); // reset on logout
    }
  }, [user]);

  // ✅ Save recentlyVisited for that user
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `recentlyVisited_${user.email}`,
        JSON.stringify(recentlyVisited)
      );
    }
  }, [recentlyVisited, user]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/all_product")
      .then((res) => setAllProduct(res.data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (productId, size) => {
    const key = `${productId}-${size}`;
    setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const decreaseFromCart = (productId, size) => {
    const key = `${productId}-${size}`;
    setCartItems((prev) => {
      const newQty = Math.max((prev[key] || 1) - 1, 0);
      return { ...prev, [key]: newQty };
    });
  };

  const deleteFromCart = (productId, size) => {
    const key = `${productId}-${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const updateCartItemQuantity = (productId, size, newQty) => {
    if (newQty < 0 || newQty > 5) return;
    const key = `${productId}-${size}`;
    setCartItems((prev) => ({ ...prev, [key]: newQty }));
  };

  const getProductQuantity = (productId, size) => {
    return cartItems[`${productId}-${size}`] || 0;
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      const [id] = key.split("-");
      const product = all_product.find((p) => String(p.id) === id);
      if (product) {
        total += product.new_price * cartItems[key];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const addToRecentlyVisited = (product) => {
    if (!user) return;
    setRecentlyVisited((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [product, ...prev.slice(0, 3)];
    });
  };

  const addToWishlist = (itemId) => {
    if (!wishlistItems.includes(itemId)) {
      setWishlistItems((prev) => [...prev, itemId]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((id) => id !== itemId));
  };

  const isInWishlist = (itemId) => wishlistItems.includes(itemId);

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    decreaseFromCart,
    deleteFromCart,
    updateCartItemQuantity,
    getProductQuantity,
    getTotalCartAmount,
    getTotalCartItems,
    recentlyVisited,
    addToRecentlyVisited,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setCartItems,
    setWishlistItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
