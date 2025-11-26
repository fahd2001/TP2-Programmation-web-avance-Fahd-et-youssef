import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useState } from "react";

function PaymentPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/api/payment/create-checkout-session", { items });

      const data = res.data;

      if (data.url) {
        // Redirection vers Stripe Checkout fournie par le backend
        window.location.href = data.url;
      } else {
        setError("Réponse Stripe invalide : pas d'URL retournée.");
      }
    } catch (err) {
      console.error("Erreur lors de la création de la session Stripe:", err);
      setError(err?.response?.data?.message || "Erreur lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2>Paiement</h2>

      <h4 className="mt-4">Résumé de la commande :</h4>
      <ul className="list-group mb-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            {item.titre} (x{item.quantity})
            <strong>{(item.prix * item.quantity).toFixed(2)} $</strong>
          </li>
        ))}
      </ul>

      <h3>Total : {totalPrice.toFixed(2)} $</h3>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <button className="btn btn-success mt-4" onClick={handleStripePayment} disabled={loading || items.length === 0}>
        {loading ? "Création de la session..." : "💳 Payer avec Stripe"}
      </button>
    </div>
  );
}

export default PaymentPage;



