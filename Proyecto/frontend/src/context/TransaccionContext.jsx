import { createContext, useContext, useState } from "react";
import {
  transaccionRequest,
  getAllTransaccionRequest,
  getTransaccionRequest,
  updateTransaccionRequest,
  deleteTransaccionRequest,
} from "../api/transaccion"; // Asegúrate de que la ruta sea correcta

const TransaccionContext = createContext();

export const useTransaccion = () => {
  const context = useContext(TransaccionContext);
  if (!context)
    throw new Error("useTransaccion must be used within a TransaccionProvider");
  return context;
};

export function TransaccionProvider({ children }) {
  const [transaccion, setTransaccion] = useState([]);
  const [errors, setErrors] = useState([]);

  // Función para manejar errores
  const handleErrors = (error) => {
    setErrors(error.response?.data?.message || ["Error desconocido"]);
  };

  //------------------- Creacion Transaccion --------------------------------

  const createTransaccion = async (transaccionData) => {
    try {
      const res = await transaccionRequest(transaccionData);
      setTransaccion([...transaccion, res.data]);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const getTransacciones = async () => {
    try {
      const res = await getAllTransaccionRequest();
      setTransaccion(res.data);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const getTransaccionById = async (cod_creacion_transaccion) => {
    try {
      const res = await getTransaccionRequest(cod_creacion_transaccion);
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const updateTransaccion = async (
    cod_creacion_transaccion,
    transaccionData
  ) => {
    try {
      const res = await updateTransaccionRequest(
        cod_creacion_transaccion,
        transaccionData
      );
      setTransaccion(
        transaccion.map((t) =>
          t.cod_creacion_transaccion === cod_creacion_transaccion ? res.data : t
        )
      );
      setErrors([]);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const deleteTransaccion = async (cod_creacion_transaccion) => {
    try {
      await deleteTransaccionRequest(cod_creacion_transaccion);
      setTransaccion(
        transaccion.filter(
          (t) => t.cod_creacion_transaccion !== cod_creacion_transaccion
        )
      );
      setErrors([]);
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <TransaccionContext.Provider
      value={{
        transaccion,
        errors,
        createTransaccion,
        getTransacciones,
        getTransaccionById,
        updateTransaccion,
        deleteTransaccion,
      }}
    >
      {children}
    </TransaccionContext.Provider>
  );
}
