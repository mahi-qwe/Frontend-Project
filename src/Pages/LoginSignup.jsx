import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext"; // adjust path

const LoginSignup = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.get(
          `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
        );
        if (res.data.length > 0) {
          localStorage.setItem("user", JSON.stringify(res.data[0]));
          setUser(res.data[0]);
          alert("Login successful!");
          navigate("/");
        } else alert("Invalid credentials");
      } else {
        const existingUser = await axios.get(
          `http://localhost:3001/users?email=${formData.email}`
        );
        if (existingUser.data.length > 0)
          return alert("Email already registered");

        // 🆕 Fetch all users and get the highest numeric ID
        const allUsers = await axios.get("http://localhost:3001/users");
        const maxId = Math.max(
          ...allUsers.data
            .map((u) => parseInt(u.id))
            .filter((id) => !isNaN(id)),
          0
        );

        const newUser = {
          ...formData,
          id: String(maxId + 1),
        };

        const res = await axios.post("http://localhost:3001/users", newUser);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        alert("Signup successful!");
        navigate("/");
      }
    } catch (err) {
      console.error("Auth failed", err);
      alert("Something went wrong");
    }
  };

  if (user) {
    return (
      <div className="w-full py-16 flex justify-center bg-white">
        <div className="w-full max-w-md bg-white shadow-md p-8 text-center rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">
            Welcome, {user.name || user.email} 👋
          </h1>
          <p className="text-base mb-6">You are logged in.</p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              navigate("/");
            }}
            className="w-full h-12 text-white bg-[#ff4141] rounded-md font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 flex justify-center bg-white px-4">
      <div className="w-full max-w-xl bg-white p-8 sm:p-12 shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 border border-[#c9c9c9] px-4 text-sm outline-none rounded-md"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="h-12 border border-[#c9c9c9] px-4 text-sm outline-none rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="h-12 border border-[#c9c9c9] px-4 text-sm outline-none rounded-md"
          />
          <button
            type="submit"
            className="w-full h-12 bg-[#ff4141] text-white text-lg font-medium rounded-md"
          >
            {isLogin ? "Login" : "Continue"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#5c5c5c]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#ff4141] font-semibold cursor-pointer"
          >
            {isLogin ? "Signup here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
