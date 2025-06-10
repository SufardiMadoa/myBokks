// src/services/authService.js
import api from "../api/axiosInstance"

export const authService = {
  register: (registerData) => 
    api.post('/auth/register', registerData),

  verifyEmail: (token) =>
    api.get('/verify', {
      params: { token }
    }),

  login: (loginData) =>
    api.post('/auth/login', loginData),
}

export default authService