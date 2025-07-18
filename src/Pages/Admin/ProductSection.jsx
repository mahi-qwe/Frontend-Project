import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category: "men",
    old_price: "",
    new_price: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/all_product");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered =
    categoryFilter === "all"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/all_product/${id}`);
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProduct) {
      //  Update existing product
      try {
        await axios.put(
          `http://localhost:3001/all_product/${editingProduct.id}`,
          editingProduct
        );
        setEditingProduct(null);
        fetchProducts();
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      //  Add new product
      const maxId = Math.max(
        ...products.map((p) => parseInt(p.id)).filter((id) => !isNaN(id)),
        0
      );
      const nextId = maxId + 1;

      const productToAdd = {
        ...newProduct,
        id: String(nextId),
      };

      try {
        await axios.post("http://localhost:3001/all_product", productToAdd);
        setNewProduct({
          name: "",
          image: "",
          category: "men",
          old_price: "",
          new_price: "",
        });
        fetchProducts();
      } catch (err) {
        console.error("Failed to add product:", err);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#171717]">All Products</h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-[600px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#f5f5f5] text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id}>
                <td className="p-2 border">{product.id}</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">${product.new_price}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product */}
      {!editingProduct && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-3 text-[#171717]">
            Add New Product
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <div className="relative w-full">
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full appearance-none border px-4 py-2 rounded bg-white shadow focus:outline-none"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
              </select>

              {/* Custom arrow icon */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-bla">
                ▼
              </div>
            </div>
            <input
              type="number"
              placeholder="Old Price"
              value={newProduct.old_price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, old_price: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="New Price"
              value={newProduct.new_price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, new_price: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-[#ff4141] text-white px-6 py-2 rounded-md font-medium hover:bg-[#e63a3a] col-span-full w-fit"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Edit Product */}
      {editingProduct && (
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-3 text-[#171717]">
            Edit Product (ID: {editingProduct.id})
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, image: e.target.value })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <select
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              className="border px-4 py-2 rounded"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
            <input
              type="number"
              value={editingProduct.old_price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  old_price: e.target.value,
                })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <input
              type="number"
              value={editingProduct.new_price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  new_price: e.target.value,
                })
              }
              className="border px-4 py-2 rounded"
              required
            />
            <div className="flex gap-3 col-span-full">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-500"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-300 px-6 py-2 rounded-md font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
