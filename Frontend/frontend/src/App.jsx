import CartPage from "./pages/CartPage.jsx";
import PaiementPage from "./pages/PaiementPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

// ⭐ IMPORT QUI MANQUAIT
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// React Router
import { Routes, Route } from "react-router-dom";

// Paiement
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentCancel from "./pages/PaymentCancel.jsx";

// Context
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">

          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produit/:id" element={<ProductPage />} />
              <Route path="/panier" element={<CartPage />} />

              {/* Paiement */}
              <Route path="/paiement" element={<PaiementPage />} />
              <Route path="/paiement/success" element={<PaymentSuccess />} />
              <Route path="/paiement/cancel" element={<PaymentCancel />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;






