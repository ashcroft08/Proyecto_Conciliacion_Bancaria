import { useEffect, createContext, useContext, useState } from "react";
import { getTokenRequest, putTokenRequest } from "../api/token";

// Crear el contexto
const ConfiguracionTokenContext = createContext();

// Hook personalizado para usar el contexto
export const useToken = () => {
  const context = useContext(ConfiguracionTokenContext);
  if (!context) throw new Error("useToken must be used within a TokenProvider");
  return context;
};

// Proveedor del contexto
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Estado para la configuración del token
  const [errors, setErrors] = useState([]); // Estado para los errores

  // Función para obtener la configuración del token
  const obtenerConfiguracionToken = async () => {
    try {
      const response = await getTokenRequest();
      setToken(response.data); // Actualizar el estado con la configuración obtenida
    } catch (error) {
      console.error("Error al obtener la configuración del token:", error);
      setErrors([...errors, "Error al obtener la configuración del token"]);
    }
  };

  // Función para actualizar la configuración del token
  const actualizarConfiguracionToken = async (expiresIn) => {
    try {
      const response = await putTokenRequest({ expiresIn });
      if (response.status === 201) {
        setToken(response.data); // Actualizar el estado con la nueva configuración
        return true;
      }
    } catch (error) {
      console.error("Error al actualizar la configuración del token:", error);
      setErrors([...errors, "Error al actualizar la configuración del token"]);
    }
  };

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Proveer el contexto con los valores y funciones necesarios
  return (
    <ConfiguracionTokenContext.Provider
      value={{
        token,
        errors,
        obtenerConfiguracionToken,
        actualizarConfiguracionToken,
      }}
    >
      {children}
    </ConfiguracionTokenContext.Provider>
  );
};
