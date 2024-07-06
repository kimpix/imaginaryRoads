import { createApp } from "vue";
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
//app.use(VueAxios, axios)
app.mount("#app")
