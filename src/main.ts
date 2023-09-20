import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar,Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

//custom scss
import './styles/app.scss';

import App from './App.vue'


const app = createApp(App)
app.use(Quasar, {
    plugins: {
        Dialog
    }, // import Quasar plugins and add here
})
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
