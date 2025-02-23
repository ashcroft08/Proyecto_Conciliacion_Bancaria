import axios from './axios'

export const registerRequest = user => axios.post(`/register`, user)

export const registerAuditorRequest = user => axios.post(`/register-auditor`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify-token')