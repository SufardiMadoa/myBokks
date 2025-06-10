<template>
    <div class="flex-1 lg:ml-0">
        <div class="p-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h2>
            <p class="text-gray-600">
              Ini adalah contoh konten utama. Sidebar dan navbar sudah responsive dan akan menyesuaikan dengan ukuran layar.
            </p>
            
            <!-- Content Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div class="bg-blue-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-blue-900">Total Users</h3>
                <p class="text-3xl font-bold text-blue-600 mt-2">1,234</p>
              </div>
              <div class="bg-green-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-green-900">Total Orders</h3>
                <p class="text-3xl font-bold text-green-600 mt-2">5,678</p>
              </div>
              <div class="bg-purple-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-purple-900">Revenue</h3>
                <p class="text-3xl font-bold text-purple-600 mt-2">$12,345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>