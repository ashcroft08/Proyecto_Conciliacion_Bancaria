import axios from './axios'

export const putTokenRequest = token => axios.put(`/configuracion-token`, token)

export const getTokenRequest = () => axios.get('/configuracion-token')