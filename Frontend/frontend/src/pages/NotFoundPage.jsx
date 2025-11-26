// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container my-5 text-center">
      <h1>404</h1>
      <p>Page introuvable.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
