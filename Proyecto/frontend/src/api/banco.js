import axios from './axios';

export const getAllBancoTransaccionRequest = (cod_periodo) => axios.get(`/banco/transacciones/${cod_periodo}`);

export const uploadBancoTransaccionesRequest = (cod_periodo, formData) =>
  axios.post(`/banco/upload/${cod_periodo}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });