import { createContext, useContext, useState, useCallback } from "react";
import {
  transaccionRequest,
  getAllTransaccionRequest,
  getTransaccionRequest,
  updateTransaccionRequest,
  deleteTransaccionRequest,
} from "../api/transaccion";

const TransaccionContext = createContext();

export const useTransaccion = () => {
  const context = useContext(TransaccionContext);
  if (!context)
    throw new Error("useTransaccion must be used within a TransaccionProvider");
  return context;
};

export function TransaccionProvider({ children }) {
  const [transacciones, setTransacciones] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleErrors = (error) => {
    setErrors(error.response?.data?.message || ["Error desconocido"]);
  };

  const createTransaccion = async (transaccionData) => {
    try {
      const res = await transaccionRequest(transaccionData);
      setTransacciones([...transacciones, res.data]);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const getTransaccionesByPeriodo = useCallback(async (cod_periodo) => {
    try {
      const res = await getAllTransaccionRequest(cod_periodo);
      setTransacciones(res.data);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  }, []);

  const getTransaccionById = async (cod_transaccion) => {
    try {
      const res = await getTransaccionRequest(cod_transaccion);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const updateTransaccion = async (cod_transaccion, transaccionData) => {
    try {
      const res = await updateTransaccionRequest(cod_transaccion, transaccionData);
      setTransacciones(
        transacciones.map((t) =>
          t.cod_transaccion === cod_transaccion ? res.data : t
        )
      );
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const deleteTransaccion = async (cod_transaccion) => {
    try {
      await deleteTransaccionRequest(cod_transaccion);
      setTransacciones(
        transacciones.filter((t) => t.cod_transaccion !== cod_transaccion)
      );
      setErrors([]);
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <TransaccionContext.Provider
      value={{
        transacciones,
        errors,
        createTransaccion,
        getTransaccionesByPeriodo,
        getTransaccionById,
        updateTransaccion,
        deleteTransaccion,
      }}
    >
      {children}
    </TransaccionContext.Provider>
  );
}