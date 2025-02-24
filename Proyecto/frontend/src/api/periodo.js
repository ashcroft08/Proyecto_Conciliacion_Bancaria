import axios from './axios'

export const periodoRequest = periodo => axios.post(`/periodo`, periodo)

export const getAllPeriodoRequest = () => axios.get(`/periodos`)

export const getPeriodoRequest = (cod_periodo) => axios.get(`/periodo/${cod_periodo}`);

export const updatePeriodoRequest = (cod_periodo, periodo) => axios.put(`/periodo/${cod_periodo}`, periodo);

export const deletePeriodoRequest = (cod_periodo) => axios.delete(`/periodo/${cod_periodo}`);