import { createApp } from 'vue'
import App from './App.vue'
import "./assets/styles.css"
import axios from "axios"

axios.defaults.baseURL = 'https://dev.nurole.com:9292/'

createApp(App).mount('#app')
