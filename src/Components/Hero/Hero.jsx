import React from "react";

const Hero = () => {
  const scrollToNewCollections = () => {
    const section = document.getElementById("new-collections");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-gradient-to-r from-[#ffe0ec] to-[#e0f7ff] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center gap-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-snug">
          Discover. Dress. Dominate.
        </h1>
        <p className="text-[#555] text-base sm:text-lg max-w-xl">
          Handpicked styles for your everyday fashion needs. Curated to impress,
          designed to stand out.
        </p>
        <button
          onClick={scrollToNewCollections}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-[#ff5858] to-[#ff4141] text-white text-sm sm:text-base font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          🛍️ Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
