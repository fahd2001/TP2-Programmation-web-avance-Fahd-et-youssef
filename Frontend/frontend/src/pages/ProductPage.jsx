import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const { addToCart } = useCart();

  // Petit badge amusant / pro aléatoire
  const badges = ["🔥 Bestseller", "✨ Nouveauté", "📘 Recommandé", "⭐ Top qualité"];
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];

  useEffect(() => {
    api
      .get(`/ouvrages/${id}`)
      .then((res) => {
        setLivre(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Ouvrage introuvable 😢");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (erreur) return <p className="text-center mt-5 text-danger">{erreur}</p>;
  if (!livre) return null;

  const imageSrc =
    livre.imageUrl && livre.imageUrl.trim() !== ""
      ? livre.imageUrl
      : "https://via.placeholder.com/500x300?text=Livre+gourmand";

  const handleAdd = () => addToCart(livre, 1);

  // ⭐ Stars (orange) — fallback 4
  const note = livre.noteMoyenne || 4;
  const nbAvis = livre.nbAvis || 128;

  return (
    <div className="container my-5">
      
      <div className="row shadow-lg p-4 rounded-4 bg-white">
        
        {/* IMAGE */}
        <div className="col-md-5 d-flex justify-content-center align-items-start">
          <img
            src={imageSrc}
            alt={livre.titre}
            className="img-fluid rounded-4 shadow product-image"
            style={{
              transition: "transform 0.3s",
              cursor: "zoom-in",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          
          <span className="badge bg-warning text-dark px-3 py-2 mb-2 fs-6">
            {randomBadge}
          </span>

          <h1 className="fw-bold">{livre.titre}</h1>
          <h4 className="text-muted mb-1">{livre.auteur}</h4>

          {/* ⭐⭐ Etoiles + avis */}
          <div className="d-flex align-items-center mb-3" style={{ marginTop: "-5px" }}>
            <div style={{ color: "#f28a00", fontSize: "1.5rem" }}>
              {"★".repeat(Math.floor(note))}
              {"☆".repeat(5 - Math.floor(note))}
            </div>
            <span className="ms-2 text-muted">({nbAvis} avis)</span>
          </div>

          {/* Ligne divisante */}
          <hr className="my-3" />

          {/* DESCRIPTION */}
          <p className="fs-5 lh-base">{livre.description}</p>

          {/* Infos rapides */}
          <div className="d-flex gap-3 mt-3">
            <span className="badge bg-secondary fs-6">{livre.categorie}</span>
            <span className="badge bg-info fs-6">
              Stock : {livre.stock ?? "N/A"}
            </span>
          </div>

          {/* 💲 Prix amélioré (ancien prix barré + nouveau prix) */}
          <div className="mt-4">
            <span className="text-muted text-decoration-line-through me-2 fs-5">
              {(livre.prix * 1.25).toFixed(2)} $
            </span>
            <span className="fw-bold text-success fs-2">
              {livre.prix} $
            </span>
            <span className="badge bg-success ms-2">-25%</span>
          </div>

          {/* BOUTON */}
          <button
            className="btn btn-success btn-lg mt-3 px-4 py-2 shadow-sm"
            style={{ 
              borderRadius: "12px",
              fontSize: "1.2rem",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleAdd}
            disabled={livre.stock === 0}
          >
            🛒 Ajouter au panier
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;




