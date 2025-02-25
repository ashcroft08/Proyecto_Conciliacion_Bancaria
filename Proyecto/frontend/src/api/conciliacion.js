// api/conciliacion.js
import axios from './axios';

export const verificarConciliacionRequest = (cod_periodo) =>
    axios.get(`/conciliacion/verificar/${cod_periodo}`);

export const realizarConciliacionRequest = (cod_periodo) =>
    axios.post('/conciliacion/realizar', { cod_periodo });

export const actualizarConciliacionRequest = (cod_periodo) =>
    axios.put('/conciliacion/actualizar', { cod_periodo });