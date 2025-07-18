import React, { useEffect, useState } from "react";
import axios from "axios";

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]); // Fetch real orders
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));

    axios
      .get("http://localhost:3001/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const getUserOrders = (email) => {
    return orders.filter((order) => order.email === email);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#171717] mb-4">
        Registered Users
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-md p-4 shadow-sm hover:shadow cursor-pointer"
            onClick={() => showUserDetails(user)}
          >
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">
            User Details: {selectedUser.name}
          </h3>
          <p className="text-sm mb-1">
            <strong>Email:</strong> {selectedUser.email}
          </p>

          {/*  Real Orders Section */}
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Order History</h4>

            {getUserOrders(selectedUser.email).length > 0 ? (
              getUserOrders(selectedUser.email).map((order) => (
                <div
                  key={order.id}
                  className="border p-4 rounded-md mb-4 bg-[#f9f9f9]"
                >
                  <p className="text-sm mb-1">
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Date:</strong> {order.date}
                  </p>

                  <ul className="text-sm mb-2 list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - Size: {item.size}, Qty: {item.qty}, $
                        {item.price}
                      </li>
                    ))}
                    <li>GST: ${2}</li>
                  </ul>

                  <p className="text-sm font-medium">
                    Total: ${order.total}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No orders found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSection;
