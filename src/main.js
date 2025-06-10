import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// Import Vuetify plugin yang sudah kamu buat
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import { createVuetify } from 'vuetify'
const queryClient = new QueryClient()

// Buat instance Vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
})
const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.use(router)
app.use(vuetify)

app.mount('#app')
