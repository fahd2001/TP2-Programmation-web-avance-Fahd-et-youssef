// src/components/BookCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function BookCard({ livre }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(livre, 1);
  };

  const imageSrc =
    livre.imageUrl && livre.imageUrl.trim() !== ""
      ? livre.imageUrl
      : "https://via.placeholder.com/300x200?text=Livre+gourmand";

  return (
    <div className="col-md-4 mb-4 d-flex">
      <div className="card h-100 flex-fill shadow-sm">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={livre.titre}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{livre.titre}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{livre.auteur}</h6>
          <p className="card-text flex-grow-1">
            {livre.description?.slice(0, 80)}...
          </p>
          <div className="mb-2">
            <span className="badge bg-secondary me-2">{livre.categorie}</span>
            <span className="badge bg-info">
              Stock : {livre.stock ?? "N/A"}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <strong>{livre.prix} $</strong>
            <div>
              <Link
                to={`/produit/${livre.id}`}
                className="btn btn-outline-primary btn-sm me-2"
              >
                Détails
              </Link>
              <button
                className="btn btn-success btn-sm"
                onClick={handleAdd}
                disabled={livre.stock === 0}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

