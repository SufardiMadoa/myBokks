
// api/axios.js
import axios from 'axios'

// Buat instance axios
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Tambahkan token ke header jika ada
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request untuk debugging
    console.log('Request:', config)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response untuk debugging
    console.log('Response:', response)
    return response
  },
  (error) => {
    console.error('Response error:', error)
    
    // Handle error responses
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expired atau unauthorized
          localStorage.removeItem('token')
          // Redirect ke login page
          window.location.href = '/login'
          break
        case 403:
          console.error('Forbidden: Tidak memiliki permission')
          break
        case 404:
          console.error('Not Found: Endpoint tidak ditemukan')
          break
        case 500:
          console.error('Server Error: Terjadi kesalahan di server')
          break
        default:
          console.error('Error:', error.response.data.message || 'Terjadi kesalahan')
      }
    } else if (error.request) {
      console.error('Network Error: Tidak dapat terhubung ke server')
    }
    
    return Promise.reject(error)
  }
)

export default api

// Export methods untuk kemudahan penggunaan
export const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config)
}