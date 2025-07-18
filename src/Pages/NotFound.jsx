import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-[120px] font-extrabold text-[#ff4141] leading-none">
        404
      </h1>
      <p className="text-2xl font-semibold text-[#171717] mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 text-sm max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link to="/">
        <button className="px-6 py-2 bg-[#ff4141] text-white text-sm sm:text-base font-medium rounded-full hover:bg-[#e63a3a] transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
