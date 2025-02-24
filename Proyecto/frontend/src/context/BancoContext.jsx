import { createContext, useContext, useState, useCallback } from "react";
import { getAllBancoTransaccionRequest } from "../api/banco";

const BancoContext = createContext();

export const useBanco = () => {
  const context = useContext(BancoContext);
  if (!context) throw new Error("useBanco must be used within a BancoProvider");
  return context;
};

export function BancoProvider({ children }) {
  const [bancoTransacciones, setBancoTransacciones] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleErrors = (error) => {
    setErrors(error.response?.data?.message || ["Error desconocido"]);
  };

  const getBancoTransaccionesByPeriodo = useCallback(async (cod_periodo) => {
    try {
      const res = await getAllBancoTransaccionRequest(cod_periodo);
      setBancoTransacciones(res.data);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  }, []);

  return (
    <BancoContext.Provider
      value={{ bancoTransacciones, errors, getBancoTransaccionesByPeriodo }}
    >
      {children}
    </BancoContext.Provider>
  );
}
