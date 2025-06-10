<template>
  <div>
    <Navbar >
      <v-main>
    <router-view />
  </v-main>
    </ Navbar  >
  </div>
</template>

<script>
import Navbar from '@/layout/Navbar.vue' // pastikan pathnya sesuai

export default {
  name: 'AdminLayout',
  components: {
    Navbar,
  },
}
</script>

<style scoped>
/* Optional styling */
main {
  padding: 1rem;
}
</style>
