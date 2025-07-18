import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import remove_icon from "/images/remove_icon.png";

const Wishlist = () => {
  const { all_product, wishlistItems, removeFromWishlist } = useContext(ShopContext);

  const wishlistProducts = all_product.filter((item) =>
    wishlistItems.includes(item.id)
  );

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-9">
        {/* Heading */}
        <h1 className="text-center text-[#171717] text-4xl sm:text-5xl font-extrabold tracking-wide relative after:content-[''] after:w-28 after:h-[4px] after:bg-[#ff4141] after:block after:mx-auto after:mt-3">
          Your Wishlist
        </h1>

        {/* Wishlist Content */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#ebebeb] rounded-xl shadow-sm p-4 flex flex-col gap-4"
              >
                {/* Product Info */}
                <Link to={`/product/${item.id}`} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-[#171717] font-semibold text-lg">
                      {item.name}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-black font-bold text-md">
                        ${item.new_price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${item.old_price}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Remove Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 bg-[#ffeaea] hover:bg-[#ffc7c7] rounded-full"
                  >
                    <img src={remove_icon} alt="Remove" className="w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          //  Empty Wishlist Design
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center text-center gap-5 px-4 py-6 sm:p-8 border border-gray-200 rounded-lg bg-[#fafafa] shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2435/2435399.png"
                alt="Empty wishlist"
                className="w-28 h-28 opacity-70"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 max-w-sm text-sm sm:text-base">
                You haven’t added anything to your wishlist yet. <br />
                Click the ❤️ icon on any product to save it here!
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

export default Wishlist;
