import axios from './axios';

export const getAllBancoTransaccionRequest = (cod_periodo) => axios.get(`/banco/transacciones/${cod_periodo}`)