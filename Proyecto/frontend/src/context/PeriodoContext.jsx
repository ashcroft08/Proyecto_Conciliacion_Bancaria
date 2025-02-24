import { createContext, useContext, useState } from "react";
import {
  periodoRequest,
  getAllPeriodoRequest,
  getPeriodoRequest,
  updatePeriodoRequest,
  deletePeriodoRequest,
} from "../api/periodo"; // Asegúrate de que la ruta sea correcta

const PeriodoContext = createContext();

export const usePeriodo = () => {
  const context = useContext(PeriodoContext);
  if (!context)
    throw new Error("usePeriodo must be used within a PeriodoProvider");
  return context;
};

export function PeriodoProvider({ children }) {
  const [periodos, setPeriodos] = useState([]); // Estado para almacenar la lista de períodos
  const [errors, setErrors] = useState([]); // Estado para manejar errores

  // Función para manejar errores
  const handleErrors = (error) => {
    setErrors(error.response?.data?.message || ["Error desconocido"]);
  };

  // Función para crear un período
  const createPeriodo = async (periodoData) => {
    try {
      const res = await periodoRequest(periodoData);
      console.log(res);
      setPeriodos([...periodos, res.data]); // Agrega el nuevo período al estado
      setErrors([]); // Limpia los errores
      if (res.status === 200) {
        return true;
      }
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  // Función para obtener todos los períodos
  const getPeriodos = async () => {
    try {
      const res = await getAllPeriodoRequest();
      setPeriodos(res.data); // Actualiza el estado con la lista de períodos
      setErrors([]); // Limpia los errores
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  // Función para obtener un período por su ID
  const getPeriodoById = async (cod_periodo) => {
    try {
      const res = await getPeriodoRequest(cod_periodo);
      setErrors([]); // Limpia los errores
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  // Función para actualizar un período
  const updatePeriodo = async (cod_periodo, periodoData) => {
    try {
      const res = await updatePeriodoRequest(cod_periodo, periodoData);
      setPeriodos(
        periodos.map((p) => (p.cod_periodo === cod_periodo ? res.data : p))
      ); // Actualiza el período en el estado
      setErrors([]); // Limpia los errores
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  // Función para eliminar un período
  const deletePeriodo = async (cod_periodo) => {
    try {
      await deletePeriodoRequest(cod_periodo);
      setPeriodos(periodos.filter((p) => p.cod_periodo !== cod_periodo)); // Elimina el período del estado
      setErrors([]); // Limpia los errores
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <PeriodoContext.Provider
      value={{
        periodos,
        errors,
        createPeriodo,
        getPeriodos,
        getPeriodoById,
        updatePeriodo,
        deletePeriodo,
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}
