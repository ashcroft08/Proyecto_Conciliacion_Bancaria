import { createContext, useContext, useState, useCallback } from "react";
import {
  verificarConciliacionRequest,
  realizarConciliacionRequest,
  actualizarConciliacionRequest,
} from "../api/conciliacion";

const ConciliacionContext = createContext();

export const useConciliacion = () => {
  const context = useContext(ConciliacionContext);
  if (!context)
    throw new Error(
      "useConciliacion debe usarse dentro de un ConciliacionProvider"
    );
  return context;
};

export const ConciliacionProvider = ({ children }) => {
  const [conciliaciones, setConciliaciones] = useState([]);

  // Verificar si hay conciliaciones para un período
  const verificarConciliacion = useCallback(async (cod_periodo) => {
    try {
      const res = await verificarConciliacionRequest(cod_periodo);
      if (res.data.existeDatos) {
        setConciliaciones(res.data.conciliaciones);
      }
      return res.data;
    } catch (error) {
      console.error("Error al verificar conciliación:", error);
      throw error;
    }
  }, []);

  // Realizar una nueva conciliación
  const realizarConciliacion = async (cod_periodo) => {
    try {
      const res = await realizarConciliacionRequest(cod_periodo);
      setConciliaciones(res.data.nuevaConciliacion);
      return res.data;
    } catch (error) {
      console.error("Error al realizar conciliación:", error);
      throw error;
    }
  };

  // Actualizar una conciliación existente
  const actualizarConciliacion = async (cod_periodo) => {
    try {
      const res = await actualizarConciliacionRequest(cod_periodo);
      setConciliaciones(res.data.nuevaConciliacion);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar conciliación:", error);
      throw error;
    }
  };

  return (
    <ConciliacionContext.Provider
      value={{
        conciliaciones,
        verificarConciliacion,
        realizarConciliacion,
        actualizarConciliacion,
      }}
    >
      {children}
    </ConciliacionContext.Provider>
  );
};
