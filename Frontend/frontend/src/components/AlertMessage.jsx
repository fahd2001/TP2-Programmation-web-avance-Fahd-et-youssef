import React from "react";
import { useCart } from "../context/CartContext.jsx";

function AlertMessage() {
  const { message } = useCart();

  if (!message) return null;

  return (
    <div className="container mt-2">
      <div className={`alert alert-${message.type}`} role="alert">
        {message.text}
      </div>
    </div>
  );
}

export default AlertMessage;
