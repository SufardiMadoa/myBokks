<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-900 via-pink-900 to-purple-900 px-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
      <div class="flex justify-center mb-6">
        <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z">
          </path>
        </svg>
      </div>
      
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
      <p class="text-gray-600 mb-6">
        Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login terlebih dahulu.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="goToLogin"
          class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
        >
          Login
        </button>
        <button
          @click="goBack"
          class="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors font-semibold"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goBack = () => {
  router.go(-1) // kembali ke halaman sebelumnya
}
</script>