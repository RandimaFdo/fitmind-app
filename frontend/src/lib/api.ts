import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
  withCredentials: false,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('fitmind_token')
  if (token) {
    const headers = config.headers ?? new AxiosHeaders()
    headers.set('Authorization', `Bearer ${token}`)
    config.headers = headers
  }
  return config
})
