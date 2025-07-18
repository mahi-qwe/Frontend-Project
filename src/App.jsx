import "./App.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop.jsx";
import ShopCategory from "./Pages/ShopCategory.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";
import LoginSignup from "./Pages/LoginSignup.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import Payment from "./Pages/Payment.jsx";
import OrderSummary from "./Pages/OrderSummary.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "./Pages/NotFound.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminProtectedRoute from "./Pages/Admin/AdminProtectedRoute.jsx";
import men_banner from "/images/banner_mens.png";
import women_banner from "/images/banner_women.png";
import kid_banner from "/images/banner_kids.png";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />

        {/* Main content area that grows */}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route path="/" element={<Shop />} />
            <Route
              path="/men"
              element={<ShopCategory banner={men_banner} category="men" />}
            />
            <Route
              path="/women"
              element={<ShopCategory banner={women_banner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCategory banner={kid_banner} category="kid" />}
            />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/order-summary"
              element={
                <ProtectedRoute>
                  <OrderSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
