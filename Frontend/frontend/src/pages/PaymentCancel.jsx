// src/pages/PaymentCancel.jsx
function PaymentCancel() {
  return (
    <div className="container text-center mt-5">
      <h1>Paiement annulé </h1>
      <p>Votre paiement n’a pas été finalisé.</p>

      <a className="btn btn-secondary mt-3" href="/paiement">
        Réessayer
      </a>
    </div>
  );
}

export default PaymentCancel;
