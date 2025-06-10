// src/services/bukuService.js
import api from "../api/axiosInstance"

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const bukuService = {
  getAllBuku: (page = 1, pageSize = 10) => {
    return api.get('/books/all', {
      params: { page, pageSize }
    })
  },

  getBukuByIdFind: (id) => api.get(`/books/detail/find/${id}`, getAuthHeader()),
  getBukuByIdFunction: (id) => api.get(`/books/detail/function/${id}`, getAuthHeader()),

  createBukuPersist: (bukuData) => api.post('/books/create/persist', bukuData, getAuthHeader()),
  createBukuFunction: (bukuData) => api.post('/books/create/function', bukuData, getAuthHeader()),
  createBukuProcedure: (bukuData) => api.post('/books/create/procedure', bukuData, getAuthHeader()),

  updateBukuFind: (id, bukuData) => api.put(`/books/update/find/${id}`, bukuData, getAuthHeader()),
  updateBukuProcedure: (id, bukuData) => api.put(`/books/update/procedure/${id}`, bukuData, getAuthHeader()),

  deleteBukuEntity: (id) => api.delete(`/books/delete/entity/${id}`, getAuthHeader()),
  deleteBukuFunction: (id) => api.delete(`/books/delete/function/${id}`, getAuthHeader()),
  deleteBukuProcedure: (id) => api.delete(`/books/delete/procedure/${id}`, getAuthHeader())
}

export default bukuService
