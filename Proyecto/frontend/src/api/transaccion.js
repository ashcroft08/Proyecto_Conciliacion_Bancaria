import axios from './axios'

export const transaccionRequest = transaccion => axios.post(`/transaccion`, transaccion)

export const getAllTransaccionRequest = (cod_periodo) => axios.get(`/transacciones/${cod_periodo}`)

export const getTransaccionRequest = (cod_transaccion) => axios.get(`/transaccion/${cod_transaccion}`);

export const updateTransaccionRequest = (cod_transaccion, transaccion) => axios.put(`/transaccion/${cod_transaccion}`, transaccion);

export const deleteTransaccionRequest = (cod_transaccion) => axios.delete(`/transaccion/${cod_transaccion}`);