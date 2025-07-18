import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const Payment = () => {
  const { getTotalCartAmount, cartItems, all_product, setCartItems } =
    useContext(ShopContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  const hasItems = Object.values(cartItems).some((qty) => qty > 0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Shipping form state
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!hasItems && !orderPlaced) {
      navigate("/cart");
    }
    window.scrollTo(0, 0);
  }, [hasItems, navigate, orderPlaced]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };
  const handlePlaceOrder = async () => {
    if (
      !shipping.name ||
      !shipping.email ||
      !shipping.address ||
      !shipping.city ||
      !shipping.pincode
    ) {
      alert("Please fill out all shipping details");
      return;
    }

    try {
      // Step 1: Get current orders
      const res = await axios.get("http://localhost:3001/orders");
      const orders = res.data;

      // Step 2: Generate new string ID in sequence
      const lastId =
        orders.length > 0 ? Number(orders[orders.length - 1].id) : 0;
      const nextId = (lastId + 1).toString(); // <== final ID is string

      // Step 3: Prepare order items
      const orderItems = Object.entries(cartItems)
        .filter(([_, qty]) => qty > 0)
        .map(([key, qty]) => {
          const [id, size] = key.split("-");
          const product = all_product.find((p) => String(p.id) === id);
          return {
            id: product.id,
            name: product.name,
            size,
            qty,
            price: product.new_price,
          };
        });

      // Step 4: Build final order object
      const orderData = {
        id: nextId, // ✅ ID is string, but incremented properly
        userId: user?.id || "guest",
        email: user?.email || shipping.email,
        name: shipping.name,
        date: new Date().toISOString().split("T")[0],
        address: shipping.address,
        city: shipping.city,
        pincode: shipping.pincode,
        items: orderItems,
        total: (totalAmount + 2).toFixed(2),
      };

      // Post to backend
      await axios.post("http://localhost:3001/orders", orderData);

      // Clear cart & show thank you message
      setCartItems({});
      setOrderPlaced(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="w-full py-16 flex justify-center bg-white px-4">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 shadow-md rounded-lg">
        {orderPlaced ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#171717]">
              Thank you for your order! 🎉
            </h2>
            <p className="text-gray-600">
              We've received your order and will start processing it right away.
            </p>
            <p className="text-[#ff4141] font-semibold">
              You will be redirected to homepage shortly...
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#171717] mb-6 text-center">
              Checkout & Payment
            </h1>

            <div className="flex flex-col gap-5 text-[#171717]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={shipping.name}
                  onChange={handleChange}
                  className="h-12 px-4 border border-[#c9c9c9] text-sm rounded-md outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={shipping.email}
                  onChange={handleChange}
                  className="h-12 px-4 border border-[#c9c9c9] text-sm rounded-md outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Shipping Address"
                  value={shipping.address}
                  onChange={handleChange}
                  className="h-12 px-4 border border-[#c9c9c9] text-sm rounded-md outline-none focus:ring-2 focus:ring-[#ff4141] col-span-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleChange}
                  className="h-12 px-4 border border-[#c9c9c9] text-sm rounded-md outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  className="h-12 px-4 border border-[#c9c9c9] text-sm rounded-md outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
              </div>

              <div className="mt-6 flex items-center justify-between text-lg font-medium">
                <span>Total Amount:</span>
                <span className="text-[#ff4141]">
                  ${(totalAmount + 2).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full h-12 bg-[#ff4141] hover:bg-[#e63a3a] text-white text-lg font-semibold rounded-md"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
