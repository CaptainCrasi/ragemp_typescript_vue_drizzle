import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

//registering components for call from clientside https://vuejs.org/guide/components/registration
import Main from './Main.vue'
import Authentication from './pages/Authentication.vue'

import './assets/style.css'

import './assets/CEFEventHandler'


createApp(App).use(createPinia())
.component('Main', Main).component('Authentication', Authentication)  //Add registered components
.mount('#app')