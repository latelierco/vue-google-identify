import { createApp } from 'vue'
import App from './App.vue'

import GoogleIdentity from '@/GoogleIdentity'

const app = createApp(App)

app.use(GoogleIdentity, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
})

app.mount('#app')
