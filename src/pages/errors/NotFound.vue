<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 px-4">
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 text-center">
      <div class="flex justify-center mb-6">
        <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.92.785-5.335 2.077m0 0a7.963 7.963 0 01-2.977-2.077 8.002 8.002 0 011.985-10.967A7.962 7.962 0 0112 3c1.752 0 3.377.563 4.694 1.511a8.002 8.002 0 011.985 10.967 7.963 7.963 0 01-2.977 2.077z">
          </path>
        </svg>
      </div>
      
      <h1 class="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
      <p class="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="goHome"
          class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
        >
          Kembali ke Beranda
        </button>
        <button
          @click="goBack"
          class="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors font-semibold"
        >
          Halaman Sebelumnya
        </button>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  // Check if user is authenticated
  const token = localStorage.getItem('accessToken')
  if (token) {
    router.push('/admin') // go to dashboard if authenticated
  } else {
    router.push('/login') // go to login if not authenticated
  }
}

const goBack = () => {
  router.go(-1) // kembali ke halaman sebelumnya
}
</script>