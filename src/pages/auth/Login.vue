<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 px-4">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
      <div class="flex flex-col items-center mb-6">
        <svg
          class="w-16 h-16 text-indigo-600 mb-2"
          fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 6v6l4 2M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2z"/>
        </svg>
        <h1 class="text-3xl font-bold text-gray-800">Perpustakaan Online</h1>
        <p class="text-gray-600 mt-1">Masuk untuk mengelola buku dan data perpustakaan</p>
      </div>

   <form @submit.prevent="login">
        <div>
          <label for="username" class="block text-gray-700 font-semibold mb-1">Username</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Masukkan Email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Masukkan password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
        >
          Masuk
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import authService from '@/service/auth'
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // Kirim request login dengan data yang sesuai format JSON
    const response = await authService.login({
      email: email.value,
      password: password.value
    })

    // Asumsikan response.data berisi token, misal { accessToken: "tokenstring" }
    const accessToken = response.data.accessToken

    if (accessToken) {
      // Simpan token ke localStorage
      localStorage.setItem('accessToken', accessToken)

      // Redirect atau lakukan aksi setelah login sukses, misal ke dashboard
      window.location.href = '/admin' // atau gunakan router.push('/admin') jika menggunakan Vue Router
    } else {
      errorMessage.value = 'Token tidak ditemukan pada response.'
    }
  } catch (error) {
    // Tangani error, misal response error dari server
    errorMessage.value = error.response?.data?.message || 'Login gagal.'
  } finally {
    loading.value = false
  }
}
</script>
