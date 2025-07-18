import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  return (
    <section className="w-full bg-white pt-6 pb-14 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {reviews.length ? (
          reviews.map(({ id, name, date, rating, comment }) => (
            <div
              key={id}
              className="p-6 bg-[#fefefe] rounded-xl shadow border border-[#ebebeb] flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-base sm:text-lg font-semibold text-[#171717]">{name}</h4>
                <p className="text-xs text-gray-400">{date}</p>
              </div>

              <div className="flex gap-[2px] mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
