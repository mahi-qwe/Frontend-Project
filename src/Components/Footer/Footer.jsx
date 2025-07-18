import footer_logo from "/images/logo_big.png";
import instagram_icon from "/images/instagram_icon.png";
import pinterest_icon from "/images/pintester_icon.png";
import whatsapp_icon from "/images/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#fef3f7] to-[#e0f7ff] pt-6 pb-4 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Logo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <img src={footer_logo} alt="footer logo" className="w-12 sm:w-16" />
          <p className="text-[#1a1a1a] text-2xl sm:text-3xl font-extrabold">
            SHOPPER
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[#333] text-sm sm:text-base font-medium">
          {["Company", "Products", "Offices", "About", "Contact"].map(
            (item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-[#ff4141] transition duration-200"
              >
                {item}
              </li>
            )
          )}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-3 sm:gap-4">
          {[instagram_icon, pinterest_icon, whatsapp_icon].map((icon, i) => (
            <div
              key={i}
              className="p-2 bg-white border border-gray-200 rounded-full shadow-sm cursor-pointer hover:scale-105 transition duration-200"
            >
              <img src={icon} alt={`icon-${i}`} className="w-4 sm:w-5" />
            </div>
          ))}
        </div>

        {/* Divider + Copyright */}
        <div className="flex flex-col items-center gap-2 w-full text-[#4b4b4b] text-xs sm:text-sm">
          <hr className="w-[85%] sm:w-[70%] h-[2px] bg-gray-300 border-none rounded" />
          <p>© {new Date().getFullYear()} SHOPPER. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
