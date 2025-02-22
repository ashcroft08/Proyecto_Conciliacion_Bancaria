import { createContext, useContext, useState } from "react";
import {
  sendRecoveryCodeRequest,
  validateRecoveryCodeRequest,
  resetPasswordRequest,
} from "../api/recoverPassword";

// Crear el contexto
const RecoverPasswordContext = createContext();

// Hook personalizado para usar el contexto
export const useRecoverPassword = () => {
  const context = useContext(RecoverPasswordContext);
  if (!context) {
    throw new Error(
      "useRecoverPassword must be used within a RecoverPasswordProvider"
    );
  }
  return context;
};

// Proveedor del contexto
export const RecoverPasswordProvider = ({ children }) => {
  const [recoveryStatus, setRecoveryStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  // Función genérica para manejar solicitudes
  const handleRequest = async (requestFunction, successMessage) => {
    setLoading(true);
    setRecoveryStatus("");
    setErrors("");
    try {
      const { data } = await requestFunction();
      setRecoveryStatus(successMessage || data.message);
      return data; // Devuelve los datos si es necesario
    } catch (error) {
      setErrors(error.response?.data?.message || "Ocurrió un error.");
      throw error; // Lanza el error si necesitas manejarlo en el componente
    } finally {
      setLoading(false);
    }
  };

  // Enviar código de recuperación
  const sendRecoveryCode = async (email) => {
    return handleRequest(
      () => sendRecoveryCodeRequest(email),
      "Código de recuperación enviado con éxito."
    );
  };

  // Validar código de recuperación
  const validateRecoveryCode = async (email, code) => {
    return handleRequest(
      () => validateRecoveryCodeRequest(email, code),
      "Código validado con éxito."
    );
  };

  // Restablecer la contraseña
  const resetPassword = async (email, code, newPassword) => {
    return handleRequest(
      () => resetPasswordRequest(email, code, newPassword),
      "Contraseña restablecida con éxito."
    );
  };

  return (
    <RecoverPasswordContext.Provider
      value={{
        recoveryStatus,
        errors,
        loading,
        sendRecoveryCode,
        validateRecoveryCode,
        resetPassword,
      }}
    >
      {children}
    </RecoverPasswordContext.Provider>
  );
};
