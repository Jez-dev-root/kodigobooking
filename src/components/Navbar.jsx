import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-blue-600 font-bold text-lg">
          KodigoBooking
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Inicio
          </Link>
          {token && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                Perfil{user?.name ? ` (${user.name})` : ""}
              </Link>
            </>
          )}
          {!token ? (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Iniciar sesión
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

