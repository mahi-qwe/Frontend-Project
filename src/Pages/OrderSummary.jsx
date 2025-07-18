// src/Pages/OrderSummary/OrderSummary.jsx
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems, all_product, getProductQuantity, getTotalCartAmount } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const cartList = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .map(([key, qty]) => {
      const [id, size] = key.split("-");
      const product = all_product.find((p) => String(p.id) === id);
      return { ...product, size, qty };
    });

  useEffect(() => {
    if (cartList.length === 0) navigate("/cart");
  }, [cartList, navigate]);                         

  return (
    <div className="w-full py-16 flex justify-center bg-white px-4">
      <div className="w-full max-w-4xl bg-white p-8 sm:p-12 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#171717]">Order Summary</h1>

        <div className="flex flex-col gap-4">
          {cartList.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                <div>
                  <h3 className="font-medium text-[#171717]">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="text-[#ff4141] font-semibold">${(item.new_price * item.qty).toFixed(2)}</p>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-lg font-medium">
            <span>Total Amount:</span>
            <span className="text-[#ff4141]">${(getTotalCartAmount() + 2).toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/payment")}
            className="mt-6 w-full h-12 bg-[#ff4141] hover:bg-[#e63a3a] text-white text-lg font-semibold rounded-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
