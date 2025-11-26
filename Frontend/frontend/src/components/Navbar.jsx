
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems, clearCart } = useCart();

  
  const auth = useAuth() || {};
  const user = auth.user || null;
  const logout = auth.logout || (() => {});

  const handleLogout = () => {
    clearCart(); // remet le panier à 0
    logout();    // supprimer token + user
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">livresgourmands.net</Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Accueil */}
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">Accueil</NavLink>
            </li>

            {/* Non connecté */}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Connexion
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Inscription
                  </NavLink>
                </li>
              </>
            )}

            {/* Connecté */}
            {user && (
              <>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </li>
              </>
            )}

            {/* Paiement (toujours visible) */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/paiement">
                Paiement
              </NavLink>
            </li>

            {/* Panier */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/panier">
                Panier ({totalItems})
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;








