import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Items/Item";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/data_product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch data_product:", err));
  }, []);

  return (
    <section className="w-full bg-white pt-1 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="inline-block bg-[#ff4141]/10 px-4 py-2 rounded-md text-xl sm:text-2xl md:text-3xl font-bold text-[#171717] tracking-wide">
            Popular in Women
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((item, i) => (
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

export default Popular;
