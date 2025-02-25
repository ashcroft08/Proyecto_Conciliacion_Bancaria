import { createContext, useContext, useState } from "react";
import {
  verificarConciliacionRequest,
  realizarConciliacionRequest,
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

  const verificarConciliacion = async (cod_periodo) => {
    try {
      const res = await verificarConciliacionRequest(cod_periodo);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const realizarConciliacion = async (cod_periodo, transacciones) => {
    try {
      const res = await realizarConciliacionRequest(cod_periodo, transacciones);
      setConciliaciones(res.data.nuevaConciliacion);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConciliacionContext.Provider
      value={{ conciliaciones, verificarConciliacion, realizarConciliacion }}
    >
      {children}
    </ConciliacionContext.Provider>
  );
};
