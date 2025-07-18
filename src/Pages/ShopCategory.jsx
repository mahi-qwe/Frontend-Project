import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Filter products by category
  const categoryProducts = all_product.filter(
    (item) => item.category === props.category
  );

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Banner */}
        <img
          className="block w-full max-w-full mx-auto mb-10 rounded-lg object-cover"
          src={props.banner}
          alt="Shop Category Banner"
        />

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categoryProducts.map((item, i) => (
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
        ) : (
          <p className="text-center text-gray-500 text-lg font-medium">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ShopCategory;
