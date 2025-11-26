import { useState } from "react";
import { useAuth } from "../context/AuthContext";     // <-- AJOUT
import { useCart } from "../context/CartContext";      // <-- AJOUT

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();   // <-- AuthContext
  const { clearCart } = useCart(); // <-- vider panier

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ " + data.message);
        return;
      }

      // → Connexion réussie
      login(data.user, data.token);  // save user + token dans AuthContext
      clearCart();                   // reset panier pour nouvel utilisateur

      alert("✅ Connexion réussie !");
      window.location.href = "/";

    } catch (err) {
      console.error(err);
      alert("❌ Erreur serveur");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" 
         style={{ minHeight: "80vh" }}>
      
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-3">Connexion</h2>

        <form onSubmit={handleLogin}>

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

          <button className="btn btn-primary w-100 mt-3">
            Se connecter
          </button>

        </form>

        <p className="text-center mt-3">
          Pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

