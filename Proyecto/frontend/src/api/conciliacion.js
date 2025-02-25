// api/conciliacion.js
import axios from './axios';

export const verificarConciliacionRequest = (cod_periodo) =>
    axios.get(`/conciliacion/verificar/${cod_periodo}`);

export const realizarConciliacionRequest = (cod_periodo, transacciones) =>
    axios.post('/conciliacion/realizar', { cod_periodo, transacciones });