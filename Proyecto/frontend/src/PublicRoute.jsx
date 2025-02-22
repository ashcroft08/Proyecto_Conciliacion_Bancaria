import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function PublicRoute({ children }) {
  const { loading, isAuthenticated, user } = useAuth();

  // Muestra una pantalla de carga mientras `loading` es true
  if (loading) return <h1>Cargando...</h1>;

  if (isAuthenticated) {
    // Redirigir según el rol del usuario autenticado
    if (user?.cod_rol === 1) return <Navigate to="/admin" replace />;
    if (user?.cod_rol === 2) return <Navigate to="/admin" replace />;
    if (user?.cod_rol === 3) return <Navigate to="/gerente" replace />;
    if (user?.cod_rol === 4) return <Navigate to="/auditor" replace />;
    if (user?.cod_rol === 5) return <Navigate to="/jefe-contador" replace />;
    if (user?.cod_rol === 6) return <Navigate to="/contador" replace />;
  }

  return children;
}

export default PublicRoute;
