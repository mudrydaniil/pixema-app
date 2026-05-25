import axios from 'axios'
import { BASE_URL } from './api'

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'c302c9bd-7556-420a-aae5-405eceb3d6c2'
  }
})

httpClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

export const { get, post } = httpClient
export default httpClient