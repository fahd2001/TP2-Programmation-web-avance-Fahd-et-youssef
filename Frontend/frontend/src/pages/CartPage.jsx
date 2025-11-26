// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container my-4">
        <h1>Panier</h1>
        <p>Votre panier est vide.</p>
      </div>
    )
  }

  return (
    <div className="container my-4">
      <h1 className="mb-3">Panier</h1>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Livre</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Sous-total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((livre) => (
            <tr key={livre.id}>
              <td>
                <strong>{livre.titre}</strong>
                <br />
                <small className="text-muted">{livre.auteur}</small>
              </td>
              <td>{livre.prix} $</td>
              <td style={{ maxWidth: "120px" }}>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={livre.quantity}
                  onChange={(e) =>
                    updateQuantity(livre.id, Number(e.target.value))
                  }
                />
              </td>
              <td>{(Number(livre.prix) * livre.quantity).toFixed(2)} $</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(livre.id)}
                >
                  Retirer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0">
            <strong>Articles :</strong> {totalItems}
          </p>
          <p className="mb-0">
            <strong>Total :</strong> {totalPrice.toFixed(2)} $
          </p>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={clearCart}>
            Vider le panier
          </button>
          <button className="btn btn-success" disabled>
            Commander (bientôt)
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;


