<script setup>
import BukuManagement from './pages/books/BukuManagement.vue';
import Navbar from './layout/Navbar.vue';
</script>

<template>
  <v-app>
    <v-main>
    
         <router-view />
        
   
    </v-main>
  </v-app>
   
</template>
<script>
export default {
  name: 'App',
}
</script>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
