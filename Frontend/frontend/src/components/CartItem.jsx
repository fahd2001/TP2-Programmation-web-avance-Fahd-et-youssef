import React from "react";
import { useCart } from "../context/CartContext.jsx";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    updateQuantity(item.id, value, item.stock);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <tr>
      <td>{item.titre}</td>
      <td>{item.auteur}</td>
      <td>{item.prix.toFixed(2)} $</td>
      <td style={{ maxWidth: "90px" }}>
        <input
          type="number"
          min="1"
          className="form-control form-control-sm"
          value={item.quantity}
          onChange={handleChange}
        />
      </td>
      <td>{(item.prix * item.quantity).toFixed(2)} $</td>
      <td>
        <button className="btn btn-sm btn-outline-danger" onClick={handleRemove}>
          Retirer
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
