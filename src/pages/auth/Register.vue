<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 px-4">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
      <div class="flex flex-col items-center mb-6">
        <svg
          class="w-16 h-16 text-indigo-600 mb-2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6l4 2M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2-2H8a2 2 0 01-2-2z"
          />
        </svg>
        <h1 class="text-3xl font-bold text-gray-800">Daftar Akun Baru</h1>
        <p class="text-gray-600 mt-1">Buat akun untuk mengelola perpustakaan</p>
      </div>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-1">Nama Lengkap</label>
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold mb-1">Username</label>
          <input
            v-model="username"
            id="username"
            type="text"
            placeholder="Masukkan username"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Masukkan email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="mb-6">
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
          class="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Mendaftar...' : 'Daftar' }}
        </button>

        <p v-if="errorMessage" class="text-red-600 mt-4 text-center">
          {{ errorMessage }}
        </p>
      </form>
    </div>

    <!-- Dialog Berhasil Register -->
    <transition name="fade">
      <div
        v-if="showSuccessDialog"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
          <div class="flex justify-center mb-4">
            <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-green-600 mb-2">Registrasi Berhasil!</h2>
          <p class="text-gray-700 mb-4">
            Silakan periksa email Anda untuk verifikasi akun.
          </p>
          <p class="text-sm text-gray-500 mb-4">
            Anda akan diarahkan ke halaman login dalam {{ countdown }} detik
          </p>
          <div class="flex gap-2 justify-center">
            <button
              @click="redirectToLogin"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Login Sekarang
            </button>
            <button
              @click="closeDialog"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { authService } from '@/service/auth'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const showSuccessDialog = ref(false)
const countdown = ref(5)

let dialogTimeout = null
let countdownInterval = null

const closeDialog = () => {
  showSuccessDialog.value = false
  clearTimeouts()
  resetForm()
}

const clearTimeouts = () => {
  if (dialogTimeout) {
    clearTimeout(dialogTimeout)
    dialogTimeout = null
  }
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

const resetForm = () => {
  name.value = ''
  username.value = ''
  email.value = ''
  password.value = ''
  errorMessage.value = ''
  countdown.value = 5
}

const redirectToLogin = () => {
  clearTimeouts()
  showSuccessDialog.value = false
  window.location.href = '/login'
}

const startCountdown = () => {
  countdown.value = 5
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      redirectToLogin()
    }
  }, 1000)
  
  // Backup timeout jika interval gagal
  dialogTimeout = setTimeout(() => {
    redirectToLogin()
  }, 5000)
}

const register = async () => {
  loading.value = true
  errorMessage.value = ''
  
  // Pastikan dialog dan timeout sebelumnya dibersihkan
  showSuccessDialog.value = false
  clearTimeouts()

  try {
    const response = await authService.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    })

    // Hanya proses sebagai sukses jika status benar-benar 200 atau 201
    if (response && (response.status === 200 || response.status === 201)) {
      console.log('Registration successful:', response)
      showSuccessDialog.value = true
      startCountdown()
    } else {
      // Status tidak sesuai harapan
      console.error('Unexpected response status:', response?.status)
      errorMessage.value = `Registrasi gagal. Status: ${response?.status || 'Unknown'}`
    }

  } catch (error) {
    console.error('Registration error:', error)
    
    // Pastikan dialog tidak muncul saat error
    showSuccessDialog.value = false
    clearTimeouts()
    
    // Handle berbagai jenis error
    if (error.response) {
      // Server memberikan response dengan status error
      const status = error.response.status
      const message = error.response.data?.message || error.response.data?.error || 'Registrasi gagal'
      
      if (status === 400) {
        errorMessage.value = `Data tidak valid: ${message}`
      } else if (status === 409) {
        errorMessage.value = 'Username atau email sudah terdaftar'
      } else if (status === 422) {
        errorMessage.value = `Validasi gagal: ${message}`
      } else if (status >= 500) {
        errorMessage.value = 'Server sedang bermasalah. Silakan coba lagi nanti.'
      } else {
        errorMessage.value = `Error (${status}): ${message}`
      }
    } else if (error.request) {
      // Request dibuat tapi tidak ada response
      errorMessage.value = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
    } else {
      // Error lainnya
      errorMessage.value = error.message || 'Terjadi kesalahan yang tidak diketahui'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>