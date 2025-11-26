import { useState } from "react";

function RegisterPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ " + data.message);
      return;
    }

    alert("✅ Inscription réussie !");
    window.location.href = "/login";

  } catch (err) {
    console.error(err);
    alert("Erreur serveur");
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center"
         style={{ minHeight: "80vh" }}>
      
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-3">Créer un compte</h2>

        <form onSubmit={handleRegister}>
          
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input 
              type="text" 
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input 
              type="email" 
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input 
              type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button className="btn btn-success w-100 mt-3">
            S’inscrire
          </button>

        </form>

        <p className="text-center mt-3">
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
