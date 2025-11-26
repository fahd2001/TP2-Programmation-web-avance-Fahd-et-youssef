// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import BookCard from "../components/BookCard";

function HomePage() {
  const [ouvrages, setOuvrages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    api
      .get("/ouvrages")
      .then((res) => {
        setOuvrages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les ouvrages 😢");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (erreur) return <p className="text-center mt-5 text-danger">{erreur}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Catalogue des livres gourmands</h1>
      </div>
      <div className="row">
        {ouvrages.map((livre) => (
          <BookCard key={livre.id} livre={livre} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
