import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Item from "../Items/Item.jsx";
import { ShopContext } from "../../Context/ShopContext.jsx";

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const currentProduct = all_product.find(
    (item) => String(item.id) === String(productId)
  );

  const relatedProducts = currentProduct
    ? all_product
        .filter(
          (item) =>
            item.category === currentProduct.category &&
            String(item.id) !== String(productId)
        )
        .slice(0, 4)
    : [];

  return (
    <section className="w-full bg-white pt-4 pb-2 md:pt-6 md:pb-4 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-0">
        {/* ✅ Matching Heading Design */}
        <div className="flex flex-col items-center text-center gap-1 mb-2">
          <h2 className="inline-block bg-[#ff4141]/10 px-4 py-2 rounded-md text-xl sm:text-2xl md:text-3xl font-bold text-[#171717] tracking-wide">
            Related Products
          </h2>
        </div>

        {/* 💫 Products */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No related products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
