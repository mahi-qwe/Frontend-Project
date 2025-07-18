import React, { useState } from "react";
import ProductSection from "./ProductSection";
import UserSection from "./UserSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-[#171717] mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === "products" ? "bg-[#ff4141] text-white" : "bg-gray-200"
          }`}
        >
          Product Section
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === "users" ? "bg-[#ff4141] text-white" : "bg-gray-200"
          }`}
        >
          User Section
        </button>
      </div>

      {activeTab === "products" ? <ProductSection /> : <UserSection />}
    </div>
  );
};

export default AdminDashboard;
