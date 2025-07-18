import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ShopContext } from "../../Context/ShopContext";

const Item = ({ id, name, image, new_price, old_price }) => {
  const { wishlistItems, addToWishlist } = useContext(ShopContext);

  const handleScrollTop = () => window.scrollTo(0, 0);

  const isWishlisted = wishlistItems.includes(id);

  return (
    <div className="relative group w-full rounded-xl p-3 border border-[#eee] bg-white transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
      {/* Wishlist Button */}
      <button
        disabled={isWishlisted}
        onClick={() => addToWishlist(id)}
        className="absolute top-5 right-5 z-10 bg-white rounded-full shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Heart
          className={`w-5 h-5 ${
            isWishlisted ? "text-[#ff4141] fill-[#ff4141]" : "text-gray-400"
          }`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${id}`} onClick={handleScrollTop}>
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-cover rounded"
        />
      </Link>

      <p className="text-base sm:text-lg font-medium text-[#333] mt-2 line-clamp-2">
        {name}
      </p>

      <div className="flex items-center gap-2 mt-1">
        <div className="text-lg font-semibold text-black">${new_price}</div>
        <div className="text-base line-through text-gray-400">${old_price}</div>
      </div>
    </div>
  );
};

export default Item;
