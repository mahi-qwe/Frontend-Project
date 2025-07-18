import React, { useContext } from "react";
import remove_icon from "/images/remove_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    decreaseFromCart,
    deleteFromCart,
    getTotalCartAmount,
    updateCartItemQuantity,
  } = useContext(ShopContext);

  const cartList = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .map(([key, qty]) => {
      const [id, size] = key.split("-");
      const product = all_product.find((p) => String(p.id) === id);
      return { ...product, size, qty };
    });

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-9">
        <h1 className="text-center text-[#171717] text-4xl sm:text-5xl font-extrabold tracking-wide relative after:content-[''] after:w-28 after:h-[4px] after:bg-[#ff4141] after:block after:mx-auto after:mt-3">
          Your Cart
        </h1>

        {cartList.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#ccc]">
              {cartList.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white border border-[#ebebeb] rounded-xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 w-full sm:w-[40%]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div>
                      <p className="text-[#171717] font-semibold text-lg">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-[#888] text-sm">
                        ${item.new_price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseFromCart(item.id, item.size)}
                      disabled={item.qty <= 1}
                      className={`w-8 h-8 rounded-full border border-[#ccc] text-xl font-bold flex items-center justify-center
                        ${
                          item.qty <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      -
                    </button>

                    <div className="min-w-[40px] text-center font-medium text-[#171717]">
                      {item.qty}
                    </div>

                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.size, item.qty + 1)
                      }
                      disabled={item.qty >= 5}
                      className={`w-8 h-8 rounded-full border border-[#ccc] text-xl font-bold flex items-center justify-center
                        ${
                          item.qty >= 5
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <p className="text-lg font-bold text-[#171717]">
                    ${item.new_price * item.qty}
                  </p>

                  {/* Remove All of This Size */}
                  <button
                    onClick={() => deleteFromCart(item.id, item.size)}
                    className="p-2 bg-[#ffeaea] hover:bg-[#ffc7c7] rounded-full"
                  >
                    <img src={remove_icon} alt="Remove" className="w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Totals */}
            <div className="w-full lg:w-[400px] bg-[#fef3f3] p-6 rounded-xl border border-[#ffdada] shadow-sm flex flex-col justify-between h-full min-h-[400px]">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-[#171717]">
                  Cart Totals
                </h2>

                <div className="flex justify-between text-[#444]">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>

                <div className="flex justify-between text-[#444]">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>

                <div className="flex justify-between text-[#444]">
                  <p>Packaging Fee</p>
                  <p>$2.00</p>
                </div>

                <div className="flex justify-between text-[#444]">
                  <p>GST</p>
                  <p>$0.00</p>
                </div>

                <hr className="border-t border-[#171717]" />

                <div className="flex justify-between font-semibold text-lg text-[#171717]">
                  <p>Total</p>
                  <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
                </div>
              </div>

              <Link to="/order-summary" className="mt-6">
                <button className="w-full py-3 bg-[#ff4141] hover:bg-[#e63a3a] text-white font-semibold rounded-full transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // EMPTY CART
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center text-center gap-5 px-4 py-6 sm:p-8 border border-gray-200 rounded-lg bg-[#fafafa] shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10967/10967115.png"
                alt="Empty cart"
                className="w-28 h-28 opacity-70"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Your cart is empty
              </h2>
              <p className="text-gray-500 max-w-sm text-sm sm:text-base">
                You haven’t added any items yet. <br />
                Start exploring our products and fill your cart.
              </p>
              <Link to="/">
                <button className="px-6 py-2 bg-[#ff4141] text-white rounded-full text-sm sm:text-base font-medium hover:bg-[#e63a3a] transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartItems;
