<template>
    <div class="h-screen bg-0 w-full bg-whte">
        <!-- Navbar -->
        <nav class="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo dan Menu Toggle -->
                    <div class="flex items-center">
                        <button @click="toggleSidebar"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden">
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="{ 'hidden': sidebarOpen, 'inline-flex': !sidebarOpen }"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                                <path :class="{ 'hidden': !sidebarOpen, 'inline-flex': sidebarOpen }"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="ml-4 flex items-center">
                            <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                    </div>

                    <!-- Menu Desktop -->
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#"
                                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#"
                                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <a href="#"
                                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
                        </div>
                    </div>

                    <!-- User Menu -->
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <button @click="toggleDropdown"
                                class="flex items-center text-sm rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="Profile">
                                <span class="ml-2 hidden md:block">John Doe</span>
                                <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-show="dropdownOpen"
                                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div class="py-1">
                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Sidebar -->
        <div class="flex pt-16 h-screen">

            <!-- Mobile Overlay -->
            <div v-show="sidebarOpen" @click="sidebarOpen = false"
                class="fixed inset-0 z-30 bg-gray-600 opacity-50 lg:hidden"></div>

            <!-- Sidebar -->
            <div :class="[
                'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            ]" class="pt-16 lg:pt-0">
                <div class="flex flex-col h-full">
                    <!-- Sidebar Header -->
                    <div class="flex items-center justify-center h-16 bg-blue-600 text-white lg:hidden">
                        <h2 class="text-lg font-semibold">Menu</h2>
                    </div>

                    <!-- Navigation Menu -->
                    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <div class="space-y-1">
                            <RouterLink to="/admin" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'dashboard' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('dashboard')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                                </svg>
                                Dashboard
                            </RouterLink>

                            <RouterLink to="/admin/books" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'users' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('users')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                Daftar Buku
                            </RouterLink>

                            <RouterLink to="/admin/jenis-buku" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'products' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('products')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Jenis Buku
                            </RouterLink>

                            <RouterLink to="/admin/orders" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'orders' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('orders')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Orders
                            </RouterLink>

                            <RouterLink to="/admin/analytics" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'analytics' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('analytics')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Analytics
                            </RouterLink>

                            <RouterLink to="/admin/settings" :class="[
                                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                activeMenu === 'settings' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            ]" @click="setActiveMenu('settings')">
                                <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </RouterLink>
                        </div>
                    </nav>

                    <!-- Sidebar Footer -->
                    <div class="p-4 border-t border-gray-200">
                        <div class="flex items-center">
                            <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="Profile">
                            <div class="ml-3">
                                <p class="text-sm font-medium text-gray-700">John Doe</p>
                                <p class="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <slot />
            <!-- Main Content -->

        </div>
    </div>
</template>


<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
    name: 'ResponsiveLayout',
    setup() {
        const sidebarOpen = ref(false)
        const dropdownOpen = ref(false)
        const activeMenu = ref('dashboard')

        const toggleSidebar = () => {
            sidebarOpen.value = !sidebarOpen.value
        }

        const toggleDropdown = () => {
            dropdownOpen.value = !dropdownOpen.value
        }

        const setActiveMenu = (menu) => {
            activeMenu.value = menu
            // Tutup sidebar di mobile setelah memilih menu
            if (window.innerWidth < 1024) {
                sidebarOpen.value = false
            }
        }

        const handleResize = () => {
            // Tutup sidebar secara otomatis di desktop
            if (window.innerWidth >= 1024) {
                sidebarOpen.value = false
            }
        }

        const handleClickOutside = (event) => {
            // Tutup dropdown jika klik di luar
            if (dropdownOpen.value && !event.target.closest('.relative')) {
                dropdownOpen.value = false
            }
        }

        onMounted(() => {
            window.addEventListener('resize', handleResize)
            document.addEventListener('click', handleClickOutside)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('click', handleClickOutside)
        })

        return {
            sidebarOpen,
            dropdownOpen,
            activeMenu,
            toggleSidebar,
            toggleDropdown,
            setActiveMenu
        }
    }
}
</script>

<style scoped>
/* Custom scrollbar untuk sidebar */
nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: #f1f1f1;
}

nav::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>