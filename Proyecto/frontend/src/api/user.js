import axios from "./axios";

export const getUsersAdminRequest = () => axios.get("/admins");

export const getGerenteRequest = () => axios.get("/gerente");

export const getJefeContableRequest = () => axios.get("/jefe-contable");

export const getUserContadorRequest = () => axios.get("/contadores");

export const getUsersAuditoresRequest = () => axios.get("/auditores");

export const getUserAuditorRequest = (cod_usuario) => axios.get(`/auditor/${cod_usuario}`);

export const getUserRequest = (cod_usuario) => axios.get(`/user/${cod_usuario}`);

export const updateUserRequest = (cod_usuario, user) => axios.put(`/user/${cod_usuario}`, user);

export const updateUserAuditorRequest = (cod_usuario, user) => axios.put(`/auditor/${cod_usuario}`, user);

export const deleteUserRequest = (cod_usuario) => axios.delete(`/user/${cod_usuario}`);

export const updatePasswordRequest = (cod_usuario, user) => axios.put(`/password/${cod_usuario}`, user);