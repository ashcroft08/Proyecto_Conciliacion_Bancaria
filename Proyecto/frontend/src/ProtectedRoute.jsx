import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ roles }) {
  const { loading, isAuthenticated, user } = useAuth();

  // Muestra una pantalla de carga mientras `loading` es true
  if (loading) return <h1>Cargando...</h1>;

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Redirige al usuario según su rol si intenta acceder a una ruta no permitida
  if (roles && !roles.includes(user?.cod_rol)) {
    if (user?.cod_rol === 1) return <Navigate to="/admin" replace />;
    if (user?.cod_rol === 2) return <Navigate to="/admin" replace />;
    if (user?.cod_rol === 3) return <Navigate to="/gerente" replace />;
    if (user?.cod_rol === 4) return <Navigate to="/auditor" replace />;
    if (user?.cod_rol === 5) return <Navigate to="/jefe-contador" replace />;
    if (user?.cod_rol === 6) return <Navigate to="/contador" replace />;
  }

  // Renderiza el contenido protegido
  return <Outlet />;
}

export default ProtectedRoute;
