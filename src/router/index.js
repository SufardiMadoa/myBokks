import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../pages/books/Dashboard.vue';
import BukuManagement from '../pages/books/BukuManagement.vue';
import AdminLayout from '@/layout/AdminLayout.vue';
import Login from '@/pages/auth/Login.vue';
import ListBook from '@/pages/books/ListBook.vue';
import Register from '@/pages/auth/Register.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // redirect root ke login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      requiresGuest: true // hanya untuk user yang belum login
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { 
      requiresGuest: true // hanya untuk user yang belum login
    }
  },
  {
    path: '/admin',
    component: AdminLayout,  // layout ini ada Navbar dan router-view
    meta: { 
      requiresAuth: true // memerlukan authentication
    },
    children: [
      {
        path: '',  // default /admin
        name: 'Dashboard',
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          title: 'Dashboard'
        }
      },
      {
        path: 'books',
        name: 'ListBook',
        component: ListBook,
        meta: { 
          requiresAuth: true,
          title: 'Daftar Buku'
        }
      },
      {
        path: 'jenis-books',
        name: 'BukuManagement',
        component: BukuManagement,
        meta: { 
          requiresAuth: true,
          title: 'Manajemen Jenis Buku'
        }
      },
      // route admin lain
    ],
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/pages/errors/Unauthorized.vue'), // lazy load
    meta: {
      title: 'Akses Ditolak'
    }
  },
  {
    path: '/:pathMatch(.*)*', // 404 catch all
    name: 'NotFound',
    component: () => import('@/pages/errors/NotFound.vue'), // lazy load
    meta: {
      title: 'Halaman Tidak Ditemukan'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Helper function untuk mengecek authentication
const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  
  // Cek apakah token ada
  if (!token) {
    return false;
  }

  try {
    // Optional: Decode JWT dan cek expiry (jika menggunakan JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Jika token expired
    if (payload.exp && payload.exp < currentTime) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken'); // hapus refresh token juga jika ada
      return false;
    }
    
    return true;
  } catch (error) {
    // Jika token tidak valid format JWT, anggap sebagai simple token
    // Anda bisa sesuaikan logic ini sesuai format token Anda
    console.warn('Token bukan format JWT, menggunakan validasi sederhana');
    return token.length > 0;
  }
};

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();
  
  // Set document title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Perpustakaan`;
  } else {
    document.title = 'Perpustakaan';
  }

  // Cek route yang memerlukan authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authenticated) {
      // User belum login, redirect ke login
      console.log('Access denied: No valid token found');
      next({
        path: '/login',
        query: { 
          redirect: to.fullPath, // simpan URL tujuan untuk redirect setelah login
          message: 'Silakan login terlebih dahulu'
        }
      });
    } else {
      // User sudah login, lanjutkan
      next();
    }
  }
  // Cek route yang hanya untuk guest (belum login)
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (authenticated) {
      // User sudah login, redirect ke dashboard
      console.log('User already authenticated, redirecting to dashboard');
      next('/admin');
    } else {
      // User belum login, lanjutkan ke halaman guest
      next();
    }
  }
  // Route publik
  else {
    next();
  }
});

// Optional: Global after hook untuk logging
router.afterEach((to, from) => {
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

export default router;