import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/faqs")
      .then((res) => setFaqs(res.data))
      .catch((err) => console.error("Failed to fetch FAQs:", err));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] mb-8 border-l-8 border-[#ff4141] pl-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-[#171717] hover:bg-gray-50 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No FAQs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
