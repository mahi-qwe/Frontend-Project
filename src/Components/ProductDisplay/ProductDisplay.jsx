import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import star_icon from "/images/star_icon.png";
import star_dull_icon from "/images/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart, addToRecentlyVisited, getProductQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeAlert, setSizeAlert] = useState("");

  useEffect(() => {
    if (product?.id) {
      addToRecentlyVisited(product);
      setSelectedSize(null);
      setSizeAlert("");
    }
  }, [product]);

  const getStockLeft = (size) => {
    return 5 - getProductQuantity(product.id, size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeAlert("Please select a size to continue.");
      return;
    }
    const stockLeft = getStockLeft(selectedSize);
    if (stockLeft <= 0) {
      setSizeAlert("Out of stock for this size.");
      return;
    }
    addToCart(product.id, selectedSize);
    setSizeAlert("");
  };

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left - Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[500px] h-auto object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Right - Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-[#171717] text-3xl sm:text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={star_icon} alt="star" className="w-5 h-5" />
            ))}
            <img src={star_dull_icon} alt="dull star" className="w-5 h-5" />
            <span className="text-gray-500 text-sm">(122 reviews)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 line-through text-xl">${product.old_price}</span>
            <span className="text-[#ff4141] text-2xl font-bold">${product.new_price}</span>
          </div>

          {/* Description */}
          <div className="space-y-4 text-base text-gray-700 leading-relaxed">
            <p>
              Step into <span className="font-semibold text-[#171717]">effortless style</span> with our ultra-soft, breathable t-shirt — crafted from{" "}
              <span className="text-[#ff4141] font-medium">100% organic cotton</span> for unmatched comfort.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-[#171717]">Lightweight & Durable</strong> – Designed to keep up with your lifestyle.</li>
              <li><strong className="text-[#171717]">Everyday Essential</strong> – Pair it with anything, wear it anywhere.</li>
              <li><strong className="text-[#171717]">Modern Minimalist Fit</strong> – Neither too tight nor too loose, just perfect.</li>
            </ul>
            <span className="italic text-gray-400">Comfort meets confidence.</span>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => {
                const stock = getStockLeft(size);
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeAlert("");
                    }}
                    disabled={stock === 0}
                    className={`px-4 py-2 border rounded-md transition text-sm font-medium
                      ${selectedSize === size ? "border-black bg-gray-100" : "border-gray-300 hover:border-black"}
                      ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {size} {stock === 0 ? "(Out of stock)" : `(${stock} left)`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Button */}
          {selectedSize && getProductQuantity(product.id, selectedSize) > 0 ? (
            <button
              onClick={() => navigate("/cart")}
              className="w-fit px-8 py-3 bg-[#ff4141] hover:bg-[#e63a3a] text-white font-semibold rounded-full shadow transition"
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-fit px-8 py-3 bg-[#ff4141] hover:bg-[#e63a3a] text-white font-semibold rounded-full shadow transition"
            >
              Add to Cart
            </button>
          )}

          {/* Alert */}
          {sizeAlert && (
            <p className="text-sm text-red-500 font-medium mt-2">{sizeAlert}</p>
          )}

          {/* Category / Tags */}
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-[#171717]">Category:</strong> Women, T-Shirt, Crop Top.</p>
            <p><strong className="text-[#171717]">Tags:</strong> Modern, Latest.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
