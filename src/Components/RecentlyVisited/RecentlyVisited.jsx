import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Items/Item";

const RecentlyVisited = () => {
  const { recentlyVisited } = useContext(ShopContext);

  if (!recentlyVisited || recentlyVisited.length === 0) return null;

  return (
    <section className="w-full bg-white pb-12 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="inline-block bg-[#ff4141]/10 px-4 py-2 rounded-md text-xl sm:text-2xl md:text-3xl font-bold text-[#171717] tracking-wide">
            Recently Visited
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recentlyVisited.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyVisited;
